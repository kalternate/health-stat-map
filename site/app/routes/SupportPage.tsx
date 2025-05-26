import Article from "~/components/Article";
import NgoCard from "~/components/NgoCard";

export default function SupportPage() {
  return (
    <Article>
      <h1 className="text-4xl font-bold">Support Page</h1>

      <p className="mb-4">
        There are several non-governmental organizations (NGOs) that focus on
        research, funding, advocacy, and direct service delivery to improve the
        global health outcomes related to malaria, tuberculosis (TB), HIV/AIDS,
        and cholera. Below is a list of just a few of the many NGOs that are
        working to eliminate these global health challenges. These organizations
        rely on donations to fund their work, enabling them to deliver essential
        supplies, provide medical care, and implement long-term solutions to
        combat these diseases. You might consider donating to these
        organizations to help support the important and much needed work that
        they are doing globally. When donating, it's always a good idea to
        research the organization's mission, impact, and financial transparency
        to ensure your donation is making a difference. The following links will
        take you to three sites that may be useful in helping you make informed
        decisions about possible places to donate.
      </p>

      <hr className="mx-10" />

      <NgoCard
        to="https://www.charitynavigator.org/ "
        imgSrc="images/CharityNav_Logo.png"
        button
      >
        Use Charity Navigator to explore charities that match your passions,
        view their ratings, and support them with your donation.
      </NgoCard>

      <hr className="mx-10" />

      <NgoCard
        to="https://www.guidestar.org/"
        imgSrc="images/GuideStar_Logo.png"
        button
      >
        Use GuideStar to look up a nonprofit and access the most complete data
        available.
      </NgoCard>

      <hr className="mx-10" />

      <NgoCard
        to="https://www.givewell.org/"
        imgSrc="images/GiveWell_Logo.png"
        button
      >
        Use Give Well to search for the charities that save or improve lives the
        most per dollar.
      </NgoCard>

      <hr className="mx-10" />

      <h2 className="my-2 text-2xl">
        Major Reputable NGOs Working on Combating{" "}
        <span className="font-bold">Global Health Issues</span>
      </h2>

      <NgoCard
        to="https://www.theglobalfund.org/en/"
        imgSrc="images/TheGlobalFund_Logo.jpg"
        title="The Global Fund to Fight AIDS, Tuberculosis and Malaria"
      >
        This organization focuses on fighting AIDS, tuberculosis, and malaria,
        providing funding and support for programs in low- and middle-income
        countries.
      </NgoCard>

      <NgoCard
        to="https://www.who.int/"
        imgSrc="images/WHO_Logo.png"
        title="World Health Organization"
        reverse
      >
        A UN agency that sets international health standards, provides support
        during health emergencies, and works with governments worldwide to
        strengthen healthcare systems.
      </NgoCard>

      <NgoCard
        to="https://www.gatesfoundation.org/"
        imgSrc="images/GatesFoundation_Logo.png"
        title="Gates Foundation"
      >
        A private foundation with a global focus on improving health and
        education, especially in low- and middle-income countries.
      </NgoCard>

      <NgoCard
        to="https://www.doctorswithoutborders.org/"
        imgSrc="images/DoctorsWithoutBorders_Logo.png"
        title="Doctors Without Borders"
      >
        This international medical humanitarian organization provides assistance 
        in countries affected by conflicts and epidemics, including those related 
        to AIDS, malaria, and cholera.
      </NgoCard>

      <NgoCard
        to="https://www.unicef.org/"
        imgSrc="images/UNICEF_Logo.jpg"
        title="UNICEF"
      >
        A United Nations agency whose work spans over 190 countries and territories. 
        They are dedicated to protecting children's rights and well-being globally. 
        As a partner in the Global Task Force on Cholera Control, they work to 
        prevent and treat cholera through various means, including providing access 
        to clean water and sanitation, delivering crucial medical supplies, and 
        advocating for increased resources for cholera control.
      </NgoCard>

      <NgoCard
        to="https://www.villagereach.org/"
        imgSrc="images/VillageReach_Logo.png"
        title="VillageReach"
      >
        Improves healthcare access and strengthens health systems in 
        remote and underserved communities.
      </NgoCard>


      <h2 className="my-2 text-2xl">
        Reputable NGOs Working on Combating Malaria Globally
        <span className="font-bold"> Global Health Issues</span>
      </h2>


      <NgoCard
        to="https://www.malarianomore.org/"
        imgSrc="images/MalariaNoMore_Logo.png"
        title="Malaria No More"
      >
        Malaria No More envisions a world where no one dies from a mosquito bite. 
        This organization is reshaping the global malaria fight through strategic 
        partnerships and a multidisciplinary approach. Their influence spans across 
        advocacy, policy, communications, technical programs, and finance to drive 
        meaningful change.
      </NgoCard>

      <NgoCard
        to="https://www.againstmalaria.com/"
        imgSrc="images/AgainstMalariaFoundation_Logo.png"
        title="Against Malaria Foundation (AMF)"
      >
        AMF focuses on distributing insecticide-treated mosquito nets (ITNs) to 
        protect people from malaria, particularly in low- and middle-income countries. 
        They are known for being a cost-effective organization.
      </NgoCard>

      <NgoCard
        to="https://www.psi.org/"
        imgSrc="images/PSI_logo.png"
        title="Population Services International (PSI)"
      >
        PSI provides malaria control support to national Ministries of Health in 
        various countries. Their programs include distributing ITNs, 
        providing malaria treatment, and implementing behavior change communications.
      </NgoCard>


      <h2 className="my-2 text-2xl">
        Reputable NGO Working on Combating Tuberculosis (TB) Globally
        <span className="font-bold"> Global Health Issues</span>
      </h2>


     <NgoCard
        to="https://www.tballiance.org/"
        imgSrc="images/TBAlliance_Logo.png"
        title="TB Alliance"
      >
        A non-profit organization dedicated to the discovery, development, 
        and delivery of better, faster, and affordable TB drugs. 
        They work globally to improve treatment outcomes for people with TB.
      </NgoCard>


      <h2 className="my-2 text-2xl">
        Reputable NGOs Working on Combating HIV/AIDS Globally
        <span className="font-bold"> Global Health Issues</span>
      </h2>


      <NgoCard
        to="https://www.unaids.org/en"
        imgSrc="images/UNAIDS_Logo.jpg"
        title="UNAIDS (Joint United Nations Program on HIV/AIDS)"
      >
        A UN global program that unites the efforts of 11 UN agencies. 
        Through advocacy, research, and technical assistance their mission 
        is to end the AIDS epidemic as a global public health threat by 2030.
      </NgoCard>

      <NgoCard
        to="https://www.eltonjohnaidsfoundation.org/"
        imgSrc="images/EltonJohn_Logo.jpg"
        title="Elton John AIDS Foundation"
      >
        This foundation works to reduce the incidence of HIV/AIDS by focusing 
        on prevention, ending stigma and discrimination, and providing 
        direct treatment, care, and support services.
      </NgoCard>

      <NgoCard
        to="https://www.aidshealth.org/"
        imgSrc="images/AHF_Logo.png"
        title="AIDS Healthcare Foundation (AHF)"
      >
        AHF is a large global organization that provides medicine and healthcare to 
        people living with HIV/AIDS. They also offer prevention, testing, and advocacy services.
      </NgoCard>


      <h2 className="my-2 text-2xl">
        Reputable NGOs Working on Combating Cholera Globally
        <span className="font-bold"> Global Health Issues</span>
      </h2>

      <NgoCard
        to="https://internationalmedicalcorps.org/"
        imgSrc="images/InternationalMedicalCore_Logo.png"
        title="International Medical Corps"
      >
        This organization rehabilitates water wells and provides education about 
        safe water practices, focusing on a multi-pronged approach to address cholera.
      </NgoCard>

      <NgoCard
        to="https://www.wateraid.org/us/"
        imgSrc="images/WaterAid_Logo.png"
        title="WaterAid"
      >
        WaterAid prioritizes clean water and sanitation infrastructure to prevent 
        cholera outbreaks and improve overall water security.
      </NgoCard>
     
      <NgoCard
        to="https://alima.ngo/en/"
        imgSrc="images/ALIMA_Logo.jpg"
        title="ALIMA (The Alliance for International Medical Action)"
      >
        ALIMA rapidly responds to cholera outbreaks by setting up treatment centers, 
        providing oral rehydration stations, and implementing awareness campaigns.
      </NgoCard>

    </Article>
  );
}
