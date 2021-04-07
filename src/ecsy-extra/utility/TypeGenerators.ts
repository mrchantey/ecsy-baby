import { cloneClonable, createType } from "ecsy";
import { BabyEvent } from "./BabyEvent";

export function babyCopyCopyable(src: any, dest: any) {
    if (!src) {
        return src;
    }

    if (!dest) {
        return src.clone();
    }
    return dest.copyFrom(src);//copyFrom, not copy
};

export function defineClonableType(ClassName: string, BabylonClass: any) {
    return createType({
        name: ClassName,
        default: new BabylonClass(),
        // copy: copyCopyable,
        copy: babyCopyCopyable,
        clone: cloneClonable,
    });
}

export const BabyEventType = defineClonableType("BabyEvent", BabyEvent);
