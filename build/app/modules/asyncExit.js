export async function asyncExit() {
	await new Promise(resolve => setTimeout(resolve, 5000));
	process.exit(0);
}
