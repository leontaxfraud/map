const categories = {
  information: { numbers: [1], color: '#FF4757' },
  tauchschule:  { numbers: [2, 9], color: '#FFA502' },
  verpflegung:  { numbers: [6, 7, 8], color: '#7C4DFF' },
  sanitaer:     { numbers: [3, 4, 5], color: '#00BCD4' },
};

let activeCategory = null;

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const cat = this.dataset.category;
    if (activeCategory === cat) {
      activeCategory = null;
      resetMarkers();
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    } else {
      activeCategory = cat;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFilter(cat);
    }
  });
});

function resetMarkers() {
  document.querySelectorAll('.map-marker').forEach(m => {
    m.querySelector('rect').style.fill = '';
    m.classList.remove('map-marker--dimmed');
    m.style.opacity = '';
  });
}

function applyFilter(cat) {
  const { numbers, color } = categories[cat];
  document.querySelectorAll('.map-marker').forEach(m => {
    const num = parseInt(m.dataset.number, 10);
    if (numbers.includes(num)) {
      m.querySelector('rect').style.fill = color;
      m.classList.remove('map-marker--dimmed');
    } else {
      m.querySelector('rect').style.fill = '';
      m.classList.add('map-marker--dimmed');
    }
  });
}
