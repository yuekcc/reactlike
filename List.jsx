// 导入 h 函数，用于 jsx 支持
import { h } from "@/reactlike";

export function List(props) {
  return (
    <div>
      {props.data.map((it) => (
        <button onclick={() => console.log(`click on ${it}`)}>{it}</button>
      ))}
    </div>
  );
}
