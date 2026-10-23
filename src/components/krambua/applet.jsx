
import { useState, useEffect } from "react";
import '../../styles/globals.css';
import styles from './applet.module.css';

export default function KrambuApplet({ items }) {
	useEffect(() => {
		console.log(items)
	});
	return (
		<div class='grid grid-cols-4 gap-10'>
			{items.map((item) => (
				<div class='card p-2 pb-5 grid grid-rows-[2fr_1fr_1fr] gap-5 w-full aspect-3/2 '>
					<img src={item.data.image} class='w-full' />
					<p class='text-subhead font-bold'>{item.data.name}</p>
					<p>{item.data.pris}</p>
				</div>
			))}
		</div>
	)
}
