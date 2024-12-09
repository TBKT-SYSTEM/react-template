import { Request, Response } from 'express';
import { db } from '../database/db';

export const getRoles = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<any[]>('SELECT * FROM sys_permission_group');

        const results = await Promise.all(rows.map(async (item: any) => {
            return {
                ...item, 
                permissions: await getPermissionsByGroupId(item.spg_id)
            };
        }));

        res.status(200).json({
            status: true,
            data: results
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getPermissionsByGroupId = async (groupId: number) => {
    const [rows] = await db.query<any[]>('SELECT sm_id, ss_id FROM sys_permission_detail WHERE spg_id = ?', [groupId]);
        
    if (rows) {
        const result: any = [];
        rows.forEach(item => {
            const existingGroup = result.find((group: any) => group.id === item.sm_id);
        
            if (!existingGroup) {
                result.push({
                    id: item.sm_id,
                    children: [],
                });
            }
        
            if (item.ss_id != 0) {
                const group = result.find((group: any) => group.id === item.sm_id);
                group.children.push({
                    id: `${item.sm_id}-${item.ss_id}`,
                    children: [],
                });
            }
        });

        return result;
    }

    return [];
}


export const saveRole = async (req: Request, res: Response) => {
    try {
        const { name, status, permissions } = req.body;

        const [rows] = await db.query<any[]>('SELECT spg_id FROM sys_permission_group WHERE spg_name = ?', [name]);

        if (rows.length > 0) {
            res.status(400).json({ message: 'Role name already exists' });
            return;
        }

        const [result]: any = await db.execute(
            'INSERT INTO sys_permission_group (spg_name, spg_status, spg_created_at) VALUES (?, ?, ?)', 
            [name, status, new Date()]
        );

        if (result.insertId) {
            if (permissions.length > 0) {
                for (const menu of permissions) {
                    if (menu.children.length > 0) {
                        for (const subMenu of menu.children) {
                            insertPermissionDetail(result.insertId, menu.id, subMenu.id);
                        }
                    } else {
                        insertPermissionDetail(result.insertId, menu.id, 0);
                    }
                }
            }
        }

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

const insertPermissionDetail = async (groupId: number, menuId: number, subMenuId: number) => {
    await db.execute(
        'INSERT INTO sys_permission_detail (spg_id, sm_id, ss_id, spd_status, spd_created_at, spd_updated_at) VALUES (?, ?, ?, ?, ?, ?)', 
        [groupId, menuId, subMenuId, 'active', new Date(), new Date()]
    )
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, status, permissions } = req.body;

        const [rows] = await db.query<any[]>('SELECT spg_id FROM sys_permission_group WHERE spg_name = ? AND spg_id != ?', [name, id]);

        if (rows.length > 0) {
            res.status(400).json({ message: 'Role name already exists' });
            return;
        }

        const [result]: any = await db.execute(
            'UPDATE sys_permission_group SET spg_name = ?, spg_status = ?, spg_updated_at = ? WHERE spg_id = ?', 
            [name, status, new Date(), id]
        );

        if (permissions) {

            await db.execute('DELETE FROM sys_permission_detail WHERE spg_id = ?', [id]);

            for (const menu of permissions) {
                if (menu.children.length > 0) {
                    for (const subMenu of menu.children) {
                        insertPermissionDetail(Number(id), menu.id, subMenu.id);
                    }
                } else {
                    insertPermissionDetail(Number(id), menu.id, 0);
                }
            }
        }

        res.status(200).json({
            status: true,
            message: 'Update successfully.',
            data: id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}



