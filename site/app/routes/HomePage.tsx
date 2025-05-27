import { Link } from "react-router";

//export function meta({}: Route.MetaArgs) {
//  return [
//    { title: "New React Router App" },
//    { name: "description", content: "Welcome to React Router!" },
//  ];
//}
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Global Health Map</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <h1>HealthStatMap</h1>
    <p>Visualizing Disease Impact Across the Globe</p>
  </header>

  <main>
    <section class="intro">
      <h2>About the Map</h2>
      <p>
        This interactive health map is designed to raise awareness about healthcare disparities across the globe. 
        It provides real-time statistics on diseases like HIV/AIDS, Cholera, Tuberculosis, and Malaria, visualized using intuitive color gradients.
        The map allows users to explore the impact of these diseases in different regions, highlighting areas that require urgent attention and support.
        By clicking on a country, you can view detailed statistics, including the number of cases, recovery rates, and healthcare resources available.
      </p>
    </section>

    <section class="features">
      <h2>Explore Features</h2>
      <div class="cards">
        <a href="#map" class="card">
          <h3>Launch HealthMap</h3>
          <p>Interact with a live global map displaying current disease statistics and healthcare data.</p>
        </a>
        <a href="#support" class="card">
          <h3>Support NGOs and Other Non-profits</h3>
          <p>Discover organizations working to improve global health and learn how you can get involved.</p>
        </a>
        <a href="#faqs" class="card">
          <h3>FAQs</h3>
          <p>Find answers to common questions about how the data is collected, interpreted, and used.</p>
        </a>
      </div>
    </section>

    <!-- Updated Disease Section -->
    <section class="diseases">
      <h2>Why These Diseases Matter</h2>
      <div class="cards static-cards">
        <div class="static-card">
          <h3>Tuberculosis (TB)</h3>
          <p>
            This disease is caused by bacteria that primarily affects the lungs, though it can also affect other parts of the body.
            It spreads through the air when people with active TB in their lungs or throat cough, speak, or sneeze.
            While TB is treatable, it can be fatal if not done so properly.
          </p>
        </div>
        <div class="static-card">
          <h3>HIV/AIDS</h3>
          <p>
            Damages the immune system so the body is less able to fight infection and disease.
            There's no cure for HIV/AIDS, but medications can control the infection and prevent disease progression.
            When left untreated, HIV typically turns into AIDS in about 8 to 10 years.
          </p>
        </div>
        <div class="static-card">
          <h3>Malaria</h3>
          <p>
            Malaria is a disease caused by a parasite. The parasite is spread to humans through the bites of infected mosquitoes.
            Malaria is curable and can be prevented through measures like mosquito nets, medication, and vaccination.
          </p>
        </div>
        <div class="static-card">
          <h3>Cholera</h3>
          <p>
            Cholera is a bacterial disease usually spread through contaminated water.
            When left untreated, cholera can be fatal within hours, even in previously healthy people.
          </p>
        </div>
      </div>
    </section>

    <section class="data-source">
      <h2>Where Does the Data Come From?</h2>
      <p>
        All statistics are sourced from <strong>World Health Organization (WHO)</strong>. If you would like to explore the data yourself,
        download the data used by navigating to the "Table" tab in the map interface.
        The data is updated regularly to ensure accuracy and relevance, providing a comprehensive overview of global health challenges.
      </p>
    </section>
  </main>

  <footer>
    <p>&copy; This map was developed by Danny Alder, Dylan Karter, Keagan Edwards, and Mason Nicholas in 2025.</p>
  </footer>
</body>
</html>

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-5 bg-gray-100 p-5">
      <h1 className="text-5xl">HealthStatMap</h1>
      <Link className="text-3xl text-sky-500 underline" to="/map">
        Go to Map
      </Link>
    </div>
  );
}
