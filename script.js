document.addEventListener('DOMContentLoaded', function() {
    // Animasi confetti
    createConfetti();
    
    // Efek ketik untuk kutipan
    typeWriter();
    
    // Animasi card saat scroll
    const cards = document.querySelectorAll('.detail-card');
    
    function checkCards() {
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Set initial state
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on load and scroll
    checkCards();
    window.addEventListener('scroll', checkCards);
    
    // Animasi memory text
    animateMemoryText();
});

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#6a1b9a', '#9c27b0', '#e91e63', '#ffeb3b', '#4caf50', '#2196f3'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const posX = Math.random() * window.innerWidth;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        const angle = Math.random() * 360;
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${posX}px`;
        confetti.style.animationDelay = `${delay}s`;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.transform = `rotate(${angle}deg)`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: absolute;
            top: -10px;
            opacity: 0.7;
            animation: fall linear infinite;
            border-radius: 50%;
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

function typeWriter() {
    const quote = document.querySelector('.quote');
    const fullText = '"Selamat ya Melly! Akhirnya sampai juga di garis finish ini."';
    let i = 0;
    
    quote.textContent = ''; // Clear text first
    
    function typing() {
        if (i < fullText.length) {
            quote.textContent += fullText.charAt(i);
            i++;
            setTimeout(typing, 50);
        }
    }
    
    setTimeout(typing, 1000);
}

function animateMemoryText() {
    const memoryText = document.querySelector('.memory-text p');
    const text = memoryText.textContent;
    memoryText.textContent = '';
    
    let j = 0;
    function typingMemory() {
        if (j < text.length) {
            memoryText.textContent += text.charAt(j);
            j++;
            setTimeout(typingMemory, 30);
        }
    }
    
    setTimeout(typingMemory, 2500);
}

function shareMessage() {
    const shareText = "ucapkan selamat yudisium untuk Tia Meyliyana Putri! Lihat ucapan spesialku: ";
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Ucapan Selamat untuk Tia',
            text: shareText,
            url: shareUrl
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareText, shareUrl);
        });
    } else {
        fallbackShare(shareText, shareUrl);
    }
}

function fallbackShare(shareText, shareUrl) {
    const textArea = document.createElement('textarea');
    textArea.value = `${shareText} ${shareUrl}`;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Tautan telah disalin ke clipboard! Anda bisa membagikannya sekarang.');
    } catch (err) {
        alert('Anda bisa membagikan tautan ini secara manual: ' + shareUrl);
    }
    
    document.body.removeChild(textArea);
}