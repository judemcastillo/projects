// fibonacci sequence
function fibonacci(n) {
	if (n <= 0) {
		return [];
	} else if (n === 1) {
		return [0];
	} else if (n === 2) {
		return [0, 1];
	} else {
		const fibSequence = [0, 1];
		for (let i = 2; i < n; i++) {
			let next = fibSequence[i - 1] + fibSequence[i - 2];
			fibSequence.push(next);
		}
		return fibSequence;
	}
}

// recursive way
function fibsRec(n) {
    console.log(`This was printed recursively ${n}`);
	if (n <= 0) {
		return [];
	} else if (n === 1) {
		return [0];
	} else if (n === 2) {
		return [0, 1];
	} else {
		const fibs = fibsRec(n - 1);
		fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
		return fibs;
	}
}
console.log(fibsRec(8));
