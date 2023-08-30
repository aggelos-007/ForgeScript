import { readdirSync } from "fs"
import { INativeFunction, NativeFunction } from "../structures/NativeFunction"
import { IRawFunction } from "../core/Compiler"
import recursiveReaddirSync from "../functions/recursiveReaddirSync"

export class FunctionManager {
    private static readonly Functions = new Map<string, NativeFunction>()

    public static load(path: string) {
        for (const file of recursiveReaddirSync(path).filter(x => x.endsWith(".js"))) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const req = require(file).default as NativeFunction
            this.Functions.set(req.name, req)
        }
    }

    public static get(name: string) {
        return this.Functions.get(name)!
    }

    public static toJSON(): INativeFunction<any>[] {
        return Array.from(this.Functions.values()).map(x => x.data)
    }
    
    public static get raw(): IRawFunction[] {
        return Array.from(this.Functions).map(
            x => {
                const [ name, { data }] = x
                return {
                    name,
                    args: data.brackets === undefined ? null : {
                        required: data.brackets,
                        fields: data.args!.map(x => ({
                            condition: x.condition,
                            rest: x.rest
                        }))
                    }
                }
            }
        )
    }
}

// eslint-disable-next-line no-undef
FunctionManager.load(`${__dirname}/../native`)