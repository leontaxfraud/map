/*
Skript für die Interaktivität der karte
*/

/* Skripte erstellt mithilfe von Claude.ai */

const categories = {
  information: { numbers: [1], color: '#FF4757' },
  tauchschule:  { numbers: [2, 9], color: '#FFA502' },
  verpflegung:  { numbers: [6, 7, 8], color: '#7C4DFF' },
  sanitaer:     { numbers: [3, 4, 5], color: '#00BCD4' },
};

const activeCategories = new Set();
const clearBtn = document.getElementById('filter-clear');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const cat = this.dataset.category;
    if (activeCategories.has(cat)) {
      activeCategories.delete(cat);
      this.classList.remove('active');
    } else {
      activeCategories.add(cat);
      this.classList.add('active');
    }
    applyFilter();
    clearBtn.classList.toggle('visible', activeCategories.size > 0);
  });
});

clearBtn.addEventListener('click', () => {
  activeCategories.clear();
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  resetMarkers();
  clearBtn.classList.remove('visible');
});

function resetMarkers() {
  document.querySelectorAll('.map-marker').forEach(m => {
    m.querySelector('rect').style.fill = '';
    m.classList.remove('map-marker--dimmed');
  });
}

function applyFilter() {
  if (activeCategories.size === 0) {
    resetMarkers();
    return;
  }

  const activeNumbers = new Set();
  activeCategories.forEach(cat => {
    categories[cat].numbers.forEach(n => activeNumbers.add(n));
  });

  document.querySelectorAll('.map-marker').forEach(m => {
    const num = parseInt(m.dataset.number, 10);
    if (activeNumbers.has(num)) {
      const cat = [...activeCategories].find(c => categories[c].numbers.includes(num));
      m.querySelector('rect').style.fill = categories[cat].color;
      m.classList.remove('map-marker--dimmed');
    } else {
      m.querySelector('rect').style.fill = '';
      m.classList.add('map-marker--dimmed');
    }
  });
}