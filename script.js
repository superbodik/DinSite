const burgerBtn = document.getElementById('burger-btn');
const navLinks = document.getElementById('nav-links');

burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

let labels = ['Вікторія Вікторівна', 'Ольга Василівна ', 'Олександр Пітяков', 'Юлія Бондаренкло', 'Світлана Ільченко', 'Володимир Москаленко', 'Іванов Руслан ', 'Гордєєва Тетяна ', 'Ольга Калюжна ', 'Наталія Ковальова ', 'Тетяна Горда '];
let data = [27, 22, 39, 24, 19.3, 40.3, 52.5, 27.4, 29.9, 27.1, 19];

let myChart;
const createChart = (chartType) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy(); 
    }
    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Вага (кг)',
                data: data,
                backgroundColor: 'rgba(255, 165, 0, 0.6)',
                borderColor: 'rgba(255, 165, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

const updateLeaderboard = () => {
    const tbody = document.getElementById('leaderTable').querySelector('tbody');
    tbody.innerHTML = ''; 
    const leaderboardData = labels.map((label, index) => ({
        label: label,
        value: data[index]
    }));

    leaderboardData.sort((a, b) => b.value - a.value);

    leaderboardData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.label}</td><td>${item.value}</td>`;
        tbody.appendChild(row);
    });
};


const handleResize = () => {
    createChart('bar');
};

window.addEventListener('resize', handleResize);

handleResize();
updateLeaderboard();

document.getElementById('addDataBtn').addEventListener('click', () => {
    const newLabel = `User${labels.length + 1}`;
    const newData = Math.floor(Math.random() * 100) + 100;
    labels.push(newLabel);
    data.push(newData);
    myChart.update();
    updateLeaderboard();
});
