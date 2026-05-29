import './AboutPage.css';

function AboutPage() {
  return (
    <div className="page">
      <h2 className="page-title">О приложении</h2>
      <div className="about-card">
        <p>Это учебное React-приложение для управления списком задач.</p>
        <p>Можно добавлять, удалять и отмечать задачи как выполненные.</p>
        <div className="tech-info">
          <h3>Используемые технологии:</h3>
          <ul>
            <li>Технология_1</li>
            <li>Технология_2</li>
            <li>Технология_3</li>
            <li>Технология_4</li>
            <li>Технология_5</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;