import { cn } from "@/lib/utils";
import { ElementType, ComponentPropsWithoutRef } from "react";

interface StarBorderProps<T extends ElementType> {
    as?: T;
    className?: string;
    color?: string;
    speed?: string;
    children?: React.ReactNode;
}

export const StarBorder = <T extends ElementType = "button">({
    as,
    className,
    color = "white",
    speed = "6s",
    children,
    ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) => {
    const Component = as || "button";

    return (
        <Component
            className={cn(
                "relative inline-block p-[3px] overflow-hidden rounded-[20px]",
                className
            )}
            {...props}
        >
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className="relative z-1 border text-inherit">{children}</div>
        </Component>
    );
};

export default StarBorder;
