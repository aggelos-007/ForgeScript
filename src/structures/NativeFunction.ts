import { BaseChannel, Guild, GuildMember, Message, Role, User } from "discord.js"
import { CompiledFunction } from "./CompiledFunction"
import { Context } from "./Context"
import { Return } from "./Return"

export type EnumLike<T = any> = {
    [id: string]: T | string;
    [nu: number]: string;
};

export type GetEnum<T> = T extends EnumLike<infer P> ? P : never;

export enum ArgType {
    String,
    Number,
    User,
    Guild,
    Json,
    Enum,
    Boolean,
    Message,
    Channel,
    Role,
    Member
}

export interface IArg<Type extends ArgType = ArgType, Required extends boolean = boolean, Rest extends boolean = boolean, Enum extends EnumLike = EnumLike> {
    name: string
    description: string
    type: Type
    enum?: Enum

    /**
     * Arg index to look at when a type requires a previously guild arg or depends on something.
     */
    pointer?: number

    condition?: boolean
    delimiter?: string
    check?: (i: GetArgType<Type, Enum>) => boolean

    /**
     * Defaults to false
     */
    required?: Required

    /**
     * Whether this argument is an array of values
     */
    rest: Rest
}

export type NativeFunctionExecutor<T extends [...IArg[]], Unwrap extends boolean = boolean> = 
    Unwrap extends true ? 
        (this: CompiledFunction<T, Unwrap>, ctx: Context, args: UnwrapArgs<T>) => Promise<Return> | Return : 
        (this: CompiledFunction<T, Unwrap>, ctx: Context) => Promise<Return> | Return

export interface INativeFunction<T extends [...IArg[]], Unwrap extends boolean = boolean> {
    name: string
    description: string
    experimental?: boolean

    /**
     * Resolves all arguments and are passed through execute params.
     */
    unwrap: Unwrap
    args?: [...T]

    /**
     * If undefined, function has no brackets
     * If false, function can have brackets.
     * If true, function must have brackets.
     */
    brackets?: boolean
    execute: NativeFunctionExecutor<T, Unwrap>
}

export type MarkRest<T, B extends boolean> = B extends true ? T[] : T
export type GetArgType<T extends ArgType, Enum extends EnumLike> = 
    T extends ArgType.Number ? 
        number : 
        T extends ArgType.String ?
            string :
            T extends ArgType.User ?
                User :
                T extends ArgType.Json ?
                    Record<string, unknown> :
                    T extends ArgType.Guild ?
                        Guild : 
                        T extends ArgType.Role ?
                            Role :
                            T extends ArgType.Boolean ? 
                                boolean :
                                T extends ArgType.Enum ? 
                                    GetEnum<Enum> :
                                    T extends ArgType.Channel ?
                                        BaseChannel :
                                        T extends ArgType.Message ?
                                            Message<true> :
                                            T extends ArgType.Member ?
                                                GuildMember : 
                                                null
   
export type MarkNullable<T, Req extends boolean, Rest extends boolean = boolean> = Rest extends true ? T : Req extends true ? T : T | null

export type UnwrapArg<T> = T extends IArg<infer Type, infer Required, infer Rest, infer Enum> ? MarkRest<MarkNullable<GetArgType<Type, Enum>, Required, Rest>, Rest> : never

export type UnwrapArgs<T> = T extends [ infer L, ...infer R ] ? [
    UnwrapArg<L>,
    ...UnwrapArgs<R>
] : []

export class NativeFunction<T extends [...IArg[]] = IArg[], Unwrap extends boolean = boolean> {
    public constructor(public readonly data: INativeFunction<T, Unwrap>) {}

    public get name() {
        return this.data.name
    }
}