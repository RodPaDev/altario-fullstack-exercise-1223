import { Request, Response, Router } from "express";
import { Payment } from "../db";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    const paymentList: Payment[] = req.db.payments.list();
    res.status(200).json({ payments: paymentList });
});

router.post('/create', (req: Request, res: Response) => {
    const { name, code, amount, grid } = req.body;

    if (!name || !code || !amount || !grid) {
        res.status(400).json({ error: "Missing required fields: name, code, amount, grid" });
        return
    }

    const newPayment: Partial<Payment> = {
        name,
        code,
        amount,
        grid,
    };

    req.db.payments.put(newPayment);
    console.log(req.db.payments.list())
    res.status(201).json({ message: "Payment created successfully", payment: newPayment });
});

export default router;
