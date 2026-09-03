const servingsElement = document.querySelector('#servings');
const baseServings = 10;

document.querySelectorAll('[data-change]').forEach((button) => {
	button.addEventListener('click', () => {
		const current = Number(servingsElement.textContent);
		const next = Math.min(30, Math.max(2, current + Number(button.dataset.change)));
		servingsElement.textContent = next;
		document.querySelectorAll('[data-base]').forEach((quantity) => {
			const value = Number(quantity.dataset.base) * next / baseServings;
			quantity.textContent = Number.isInteger(value) ? value : value.toFixed(1).replace('.', ',');
		});
	});
});

document.querySelector('#print-button').addEventListener('click', () => window.print());

document.querySelector('#share-button').addEventListener('click', async (event) => {
	const button = event.currentTarget;
	try {
		if (navigator.share) await navigator.share({ title: document.title, text: 'Bolo de cenoura fofinho com cobertura de chocolate', url: window.location.href });
		else await navigator.clipboard.writeText(window.location.href);
		button.innerHTML = '<span>✓</span> Link copiado';
		setTimeout(() => { button.innerHTML = '<span>↗</span> Compartilhar'; }, 2200);
	} catch (error) {
		if (error.name !== 'AbortError') button.innerHTML = '<span>!</span> Tente novamente';
	}
});

const timerButton = document.querySelector('#timer-button');
const timerElement = document.querySelector('#timer');
let timerSeconds = 35 * 60;
let timerInterval;

timerButton.addEventListener('click', () => {
	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = undefined;
		timerButton.firstChild.textContent = '▶ Continuar timer ';
		return;
	}
	timerButton.firstChild.textContent = 'Ⅱ Pausar timer ';
	timerInterval = setInterval(() => {
		timerSeconds -= 1;
		const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
		const seconds = (timerSeconds % 60).toString().padStart(2, '0');
		timerElement.textContent = `${minutes}:${seconds}`;
		if (timerSeconds <= 0) {
			clearInterval(timerInterval);
			timerInterval = undefined;
			timerButton.firstChild.textContent = '✓ Bolo pronto ';
		}
	}, 1000);
});
