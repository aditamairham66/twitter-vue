import mitt from "mitt";

const emitter = mitt()

export function useEmit() {
    return {
        $on: emitter.on,
        $emit: emitter.emit
    }
}