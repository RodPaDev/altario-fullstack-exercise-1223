import { Request, Response, Router } from "express";
import { adjustCount, isBiasSettable, isSingleAlphabeticalChar } from "../utils";

const ALPHABET: string = "abcdefghijklmnopqrstuvwxyz"
const GRID_SIZE: Array<number> = [10, 10]
const router: Router = Router();

let lastBiasTime: number = 0
let currentGrid: string = "yzlkjayabnsldvmwestlboeuyefgkvowzbsoeugghlphdjibirtetssogyusmabyapdqfgmhmznhuougnlupfvajtshdazwxkpnw"

router.post('/generate', (req: Request, res: Response) => {
    const bias = req.query.bias as string;
    let cells = GRID_SIZE[0] * GRID_SIZE[1]
    let grid = ""
    let idx = 0

    // validation
    if (bias) {
        if (!isSingleAlphabeticalChar(bias)) {
            res.status(400).send({ message: "Invalid bias character. Must be a single letter a-z." });
            return
        }

        let newBiasTime = isBiasSettable(lastBiasTime)
        if (newBiasTime) {
            lastBiasTime = newBiasTime
        } else {
            res.status(429).send({ message: "You can only input a new bias character every 4 seconds." });
            return
        }

    }

    // generation
    while (idx < cells) {
        let char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]

        if (bias && Math.random() < 0.2) {
            char = bias.toLowerCase()
        }

        grid += char
        idx += 1
    }
    currentGrid = grid
    res.status(200).send({ grid })
});

router.get('/decode', (req: Request, res: Response) => {
    if (currentGrid.length !== GRID_SIZE[0] * GRID_SIZE[1]) {
        res.status(500).send({ message: "Invalid Grid. Possibly no grid in memory." })
    }

    let secondsDigits = new Date().getSeconds().toString().padStart(2, '0').split("");
    const firstDigit = Number(secondsDigits[0]);
    const secondDigit = Number(secondsDigits[1]);

    const pos1 = firstDigit * GRID_SIZE[1] + secondDigit;
    const pos2 = secondDigit * GRID_SIZE[1] + firstDigit;

    let char1 = currentGrid[pos1]
    let char2 = currentGrid[pos2]

    const gridChars: { [key: string]: number } = { [char1]: 0, [char2]: 0 };

    for (let char of currentGrid) {
        if (gridChars[char] !== undefined) {
            gridChars[char] += 1
        }
    }

    const codeDigit1 = adjustCount(gridChars[char1]);
    const codeDigit2 = adjustCount(gridChars[char2]);

    res.status(200).send({ code: Number(`${codeDigit1}${codeDigit2}`) });
})

export default router
