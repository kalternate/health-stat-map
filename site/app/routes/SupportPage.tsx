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
    </Article>
  );
}
