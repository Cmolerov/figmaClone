import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback } from "react";
import CursorChat from "./cursor/CursorChat";

const Live = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();
        // console.log("cursor", cursor);
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    const handlePointerDown = useCallback((event: React.PointerEvent) => {
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({ cursor: { x, y } });
    }, []);

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        event.preventDefault();

        updateMyPresence({ cursor: null, message: null });
    }, []);

    // console.log("others", others);
    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            className="h-[100vh] w-full flex justify-center items-center text-center "
        >
            <h1 className="text-2xl text-white">Liveblocks Figma Clone</h1>;
            <LiveCursors others={others} />
        </div>
    );
};

export default Live;
