// 导入 h 函数，用于 jsx 支持
import { h } from './src/reactlike';

function Item(props) {
  return <button onclick={props.onclick}>{props.label}</button>;
}
export function List(props) {
  const onItemClick = x => console.log(`click on item: `, x);

  return (
    <div>
      {props.data.map(it => (
        <Item onclick={() => onItemClick(it)} label={it}></Item>
      ))}
    </div>
  );
}
