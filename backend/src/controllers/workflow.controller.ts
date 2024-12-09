import { Request, Response } from 'express';
import { db } from '../database/db';

export const getWorkflows = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<any[]>(`SELECT
            mw.mw_id, mwt.mwt_id, mwt_name, su.su_id, su.su_username, su.su_firstname, su.su_lastname, mw.mw_order, mw.mw_status
            FROM mst_workflow mw
            LEFT JOIN mst_workflow_type mwt ON mw.mwt_id = mwt.mwt_id
            LEFT JOIN sys_user su ON mw.su_id = su.su_id`);

        const groupedData = rows.reduce((acc, row) => {
            const { mw_id, mwt_id, mwt_name, su_id, su_firstname, su_lastname, mw_order, mw_status, su_username } = row;

            if (!acc[mwt_id]) {
                acc[mwt_id] = {
                    id: mwt_id,
                    name: mwt_name,
                    status: mw_status,
                    approvers: []
                };
            }

            acc[mwt_id].approvers.push({
                workflow_id: mw_id,
                id: su_id,
                username: su_username,
                name: su_firstname,
                lastname: su_lastname,
                order: mw_order,
                status: mw_status
            });

            return acc;
        }, {});

        const result = Object.values(groupedData);

        res.status(200).json({
            status: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};


export const getWorkflowType = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<any[]>(`SELECT
            mwt.mwt_id,
            mwt_name,
            mw.used
            FROM
            mst_workflow_type mwt
            LEFT JOIN (SELECT mwt_id, COUNT(mwt_id) AS used FROM mst_workflow GROUP BY mwt_id) mw ON mwt.mwt_id = mw.mwt_id`);

        res.status(200).json({
            status: true,
            data: rows
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

export const saveWorkflows = async (req: Request, res: Response) => {
    try {
        const { workflowType, status, approvers } = req.body;
        console.log(workflowType, status, approvers);
        
        // loop through approvers and insert into db
        for (const [index, approver] of approvers.entries()) {
            const query = `
                INSERT INTO mst_workflow (mwt_id, su_id, mw_order, mw_status, mw_created_at)
                VALUES (?, ?, ?, ?, ?)
            `;
        
            const values = [workflowType, Number(approver.user), index + 1, status, new Date()];
        
            await db.execute(query, values);
        }

        res.status(200).json({
            status: true,
            message: 'Save successfully.'
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}

export const updateWorkflow = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, approvers } = req.body;

        // update workflow
        await db.execute(
            'DELETE FROM mst_workflow WHERE mwt_id = ?', 
            [id]
        );

        for (const [index, approver] of approvers.entries()) {
            const query = `
                INSERT INTO mst_workflow (mwt_id, su_id, mw_order, mw_status, mw_created_at)
                VALUES (?, ?, ?, ?, ?)
            `;
        
            const values = [id, Number(approver.user), index + 1, status, new Date()];
            await db.execute(query, values);
        }

        res.status(200).json({
            status: true,
            message: 'Edit successfully.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}