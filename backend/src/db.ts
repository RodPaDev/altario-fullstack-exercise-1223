import { Request, Response, NextFunction } from "express";
import { generateId } from "./utils";

// in real-life I would use some kind of db be it nosql or sql but for the scope of this project I didn't want to setup an ORM
// I think this is enough to simulate db interaction. Caveat: non-persistant in-memory "db"

export interface Payment {
    id: string;
    name: string;
    code: number;
    amount: number;
    grid: string;
}


export class Collection<T> {
    private items: Map<string, T>;

    constructor() {
        this.items = new Map<string, T>();
    }

    put(item: Partial<T>): T {
        let id = generateId()
        let paymentObj = { id, ...item } as T
        this.items.set(id, paymentObj);
        return paymentObj
    }

    get(id: string): T | null {
        return this.items.get(id) ?? null;
    }

    update(id: string, updatedItem: Partial<T>): void {
        const existingItem = this.items.get(id);
        if (!existingItem) {
            throw new Error(`Item with ID ${id} does not exist.`);
        }
        this.items.set(id, { ...existingItem, ...updatedItem });
    }

    delete(id: string): boolean {
        return this.items.delete(id);
    }

    list(): T[] {
        return Array.from(this.items.values());
    }

    has(id: string): boolean {
        return this.items.has(id);
    }
}

export class AltarioDB {
    public payments: Collection<Payment>;

    constructor() {
        this.payments = new Collection<Payment>();
    }
}

const instance = new AltarioDB

export default function initAltarioDB(req: Request, _res: Response, next: NextFunction) {
    req.db = instance;
    next();
}
