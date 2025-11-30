// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Later, we can add:
// - Smooth scrolling
// - Loading properties from JSON / Firebase
// - Form submission handling
console.log("Safe Buy Realties landing page loaded.");


// Add CSS animation
const style = document.createElement('style');
style.textContent = `
@keyframes particle {
  0% { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(${Math.random()*200-100}px, ${Math.random()*200-100}px) scale(0); opacity: 0; }
}`;
document.head.appendChild(style);