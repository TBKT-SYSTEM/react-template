import { Request, Response } from 'express';
import { db } from '../database/db';

export const saveMainMenu = async (req: Request, res: Response) => {
    try {
        const { name, icon, order, route } = req.body;

        const [rows] = await db.query<any[]>('SELECT sm_id FROM sys_menu WHERE sm_name = ?', [name]);

        if (rows.length > 0) {
            res.status(400).json({ message: 'Menu name already exists' });
            return;
        }

        const [result]: any = await db.execute(
            'INSERT INTO sys_menu (sm_name, sm_route, sm_icon, sm_order, sm_created_at) VALUES (?, ?, ?, ?, ?)', 
            [name, route, icon, Number(order), new Date()]
        );

        res.status(200).json({
            status: true,
            message: 'Save successfully.',
            data: result.insertId
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const saveSubMenu = async (req: Request, res: Response) => {
    try {
        const { name, parent, route, order } = req.body;

        const [rows] = await db.query<any[]>('SELECT ss_id FROM sys_submenu WHERE ss_name = ?', [name]);

        if (rows.length > 0) {
            res.status(400).json({ message: 'Sub Menu name already exists' });
            return;
        }

        const [result]: any = await db.execute(
            'INSERT INTO sys_submenu (ss_name, sm_id, ss_route, ss_order, ss_created_at) VALUES (?, ?, ?, ?, ?)', 
            [name, parent, route, Number(order), new Date()]
        );

        res.status(200).json({
            status: true,
            message: 'Save successfully.',
            data: result.insertId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getMainMenus = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<any[]>('SELECT * FROM sys_menu');

        res.status(200).json({
            status: true,
            data: rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getPermissions = async (req: Request, res: Response) => {
    try {
        let sql = `SELECT sm.sm_id, sm_name, sm_icon, sm_status, sm_order, ss_id, ss_name, ss_route, ss_status, ss_order, sm_route
                    FROM sys_menu sm
                    LEFT JOIN sys_submenu ss ON sm.sm_id = ss.sm_id
                    AND sm.sm_status = 'active' and ss.ss_status = 'active'
                    ORDER BY sm.sm_order, ss.ss_order`;

        const [rows] = await db.query<any[]>(sql);

        res.status(200).json({
            status: true,
            data: rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getPermissionDetail = async (req: Request, res: Response) => {
    try {
        const { id, type } = req.params;
        let sql = '';
        if (type === 'menu') {
            sql = `SELECT
                        sm_id as id, sm_name as name, sm_route as route, sm_icon as icon, sm_status as status, sm_order as ordering
                    FROM sys_menu
                    WHERE sm_id = ?`;
        } else {
            sql = `SELECT 
                        ss_id as id, ss_name as name, ss_route as route, ss_status as status, ss_order as ordering, sm_id as parent
                    FROM sys_submenu
                    WHERE ss_id = ?`;
        }

        const [rows] = await db.query<any[]>(sql, [id]);
            res.status(200).json({
                status: true,
                data: rows
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const updateMainMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, icon, order, route } = req.body;

        const [result]: any = await db.execute(
            'UPDATE sys_menu SET sm_name = ?, sm_icon = ?, sm_order = ?, sm_route = ? WHERE sm_id = ?', 
            [name, icon, Number(order), route, id]
        );

        res.status(200).json({
            status: true,
            message: 'Update successfully.',
            data: result.insertId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const updateSubMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, parent, route, order } = req.body;

        const [result]: any = await db.execute(
            'UPDATE sys_submenu SET ss_name = ?, sm_id = ?, ss_route = ?, ss_order = ? WHERE ss_id = ?', 
            [name, parent, route, Number(order), id]
        );

        res.status(200).json({
            status: true,
            message: 'Update successfully.',
            data: result.insertId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteMainMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const [result]: any = await db.execute(
            'UPDATE sys_menu SET sm_status = ? WHERE sm_id = ?', 
            ['inactive', id]
        );

        res.status(200).json({
            status: true,
            message: 'Delete successfully.',
            data: result.insertId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteSubMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const [result]: any = await db.execute(
            'UPDATE sys_submenu SET ss_status = ? WHERE ss_id = ?', 
            ['inactive', id]
        );

        res.status(200).json({
            status: true,
            message: 'Delete successfully.',
            data: result.insertId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getSidebars = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query<any[]>(`SELECT
            spd_id,
            sm.sm_id,
            sm_name,
            sm_route,
            sm_icon,
            sm_order,
            ss.ss_id,
            ss.ss_name,
            ss.ss_route,
            ss.ss_order
            FROM
            sys_permission_detail spd
            LEFT JOIN sys_menu sm ON spd.sm_id = sm.sm_id AND sm.sm_status = 'active'
            LEFT JOIN sys_submenu ss ON spd.ss_id = ss.ss_id AND ss.ss_status = 'active'
            WHERE
            spd.spg_id = ?
            ORDER BY sm.sm_order, ss.ss_order`, [id]);

        const result: any  = [{ "header": "", "items": []}];

        if (rows.length > 0) {
            for (const row of rows) {
                console.log(row);
                
                if (!result[0]['items'][row.sm_id]) {
                    result[0]['items'][row.sm_id] = {
                        "id": row.sm_id,
                        "text": row.sm_name,
                        "icon": row.sm_icon,
                        "available": true,
                        "link": !row.ss_id ? row.sm_route : "",
                        "order": row.sm_order,
                        
                    }

                    if (row.ss_id) {
                        result[0]['items'][row.sm_id]['submenu'] = [];
                    }
                }

                if (row.ss_id) {
                    result[0]['items'][row.sm_id]['submenu'].push({ 
                        "id": `${row.sm_id}-${row.ss_id}`,
                        "text": row.ss_name,
                        "available": true,
                        "link": row.ss_route,
                        "order": row.ss_order
                    })
                }
            }

            result[0]['items'] = Object.keys(result[0]['items'])
                .map(key => result[0]['items'][key])
                .sort((a, b) => a.order - b.order);

            for (const item of result[0]['items']) {
                if (item.submenu) {
                    item.submenu.sort((a: any, b: any) => a.order - b.order);
                }
            }
        }

        res.status(200).json({
            status: true,
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

