// Script para o menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


// Script para o formulário de contato com Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = "<p class='text-green-600 font-bold'>Obrigado por sua mensagem! Responderei em breve.</p>";
            contactForm.reset();
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                const errorMessages = responseData["errors"].map(error => error["message"]).join(", ");
                formStatus.innerHTML = `<p class='text-red-600 font-bold'>Oops! Houve um problema: ${errorMessages}</p>`;
            } else {
                formStatus.innerHTML = "<p class='text-red-600 font-bold'>Oops! Houve um problema ao enviar sua mensagem.</p>";
            }
        }
    } catch (error) {
        formStatus.innerHTML = "<p class='text-red-600 font-bold'>Oops! Houve um problema ao enviar sua mensagem.</p>";
    }
}

contactForm.addEventListener("submit", handleSubmit);
