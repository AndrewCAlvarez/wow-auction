export default function SkillTierSummary(props) {
  return (
    <section className="section-summary">
      <h2>Skill Tier Summary</h2>
      <p>{props.skillTier.name}</p>
    </section>
  );
}
