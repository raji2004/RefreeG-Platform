import { typographyProps } from "@/lib/type";
import { cn } from "@/lib/utils";



export const H1 = ({ className, children }: typographyProps) => {
    return (
        <h1 className={cn(className,'text-2xl md:text-5xl leading-relaxed')}>{children}</h1>
    )
}

export const P = ({ className, children, }: typographyProps) => {
    return (
        <p className={cn(className,'text-sm md:text-base leading-normal')}>{children}</p>
    )

}