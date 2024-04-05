import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CanvasKitInit, { Paint } from "canvaskit-wasm";

function App() {
	const [count, setCount] = useState(0);
	const [foo, setFoo] = useState("foo");
	CanvasKitInit({
		locateFile: (file) => `../node_modules/canvaskit-wasm/bin/${file}`,
	}).then((CanvasKit) => {
		// Code goes here using CanvasKit
		const surface = CanvasKit.MakeSWCanvasSurface(foo);
		const paint = new CanvasKit.Paint();
		paint.setColor(CanvasKit.Color4f(0.9, 0, 0, 1.0));
		paint.setStyle(CanvasKit.PaintStyle.Stroke);
		paint.setAntiAlias(true);
		const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(10, 60, 210, 260), 15, 15);

		function draw(canvas: {
			clear: (arg0: Float32Array) => void;
			drawRRect: (arg0: Float32Array, arg1: Paint) => void;
		}) {
			canvas.clear(CanvasKit.WHITE);
			canvas.drawRRect(rr, paint);
		}
		surface?.drawOnce(draw);
	});

	return <canvas id={foo} width={500} height={300} />;
}

export default App;
