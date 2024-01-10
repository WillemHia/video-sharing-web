import React, { FC } from "react";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { increment, decrement, selectCount, incrementAsync, incrementByAmount, incrementIfOdd } from "@/stores/counterSlice";

const Home: FC = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(incrementAsync(2))}>async +</button>
            <button onClick={() => dispatch(incrementByAmount(3))}>+ 3</button>
            <button onClick={() => dispatch(incrementIfOdd())}>+ if odd</button>
        </div>
    );
};

export default Home;