import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GENESIS_URL = "https://ourgenesis-six.vercel.app/";
const MY_UID = "cymFAhjKyRPg66o26ppFtb7QhVO2";
const WHATSAPP_NUMBER = "26776536857";

const commitments = [
  ["I choose you", "Intentionally. Fully. Not halfway."],
  ["You can be soft with me", "You never have to earn tenderness."],
  ["My leadership comes with care", "Being the dominant one never means your voice disappears."],
  ["We protect what we build", "The relationship is something we both get to shape."]
];

const pact = [
  "I will pursue you intentionally, not halfway.",
  "I may be the dominant one, but your consent and voice are never optional.",
  "You can say no, change your mind, ask for space, or tell me I am being ridiculous.",
  "I will protect your softness without treating you like you cannot stand on your own.",
  "We will keep communicating, laughing, flirting and choosing each other."
];

const reasons = [
  "because your softness makes me want to be gentler",
  "because making you laugh is ridiculously satisfying",
  "because I like the way you make ordinary moments feel less ordinary",
  "because I want the boring Tuesdays and the crazy stories too",
  "because I would rather build something real than keep wondering what if",
  "because, annoyingly, you have become one of my favourite people"
];

const dateIdeas = [
  ["🌙", "Late-night drive", "Music loud, windows down, nowhere important to be."],
  ["🍕", "Food + movie", "You choose the food. I pretend I am not stealing yours."],
  ["🎮", "Stay-in chaos", "Games, snacks, teasing and absolutely no productivity."],
  ["🌅", "Sunset mission", "Find a pretty place and make a memory out of it."]
];

function Confetti() {
  return <div className="confetti" aria-hidden="true">{Array.from({length: 28}, (_, i) => <i key={i} style={{"--i": i}} />)}</div>;
}

function App() {
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(0);
  const [reason, setReason] = useState(reasons[0]);
  const [dateIndex, setDateIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime((v) => v + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const nextReason = () => setReason(reasons[Math.floor(Math.random() * reasons.length)]);
  const nextDate = () => setDateIndex((v) => (v + 1) % dateIdeas.length);

  const sayYes = () => {
    const message = "💕 SHE SAID YES!!!\n\nYour girlfriend has officially accepted the proposal. 😂❤️\n\nGenesis setup is next.";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setAccepted(true);
  };

  const copyUid = async () => {
    await navigator.clipboard.writeText(MY_UID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="page">
      <div className="orb orb-a" /><div className="orb orb-b" /><div className="orb orb-c" />
      {!accepted ? (
        <section className="shell">
          <div className="eyebrow">A tiny website with a very serious question</div>
          <div className="heart" aria-hidden="true">♡</div>
          <h1>There is something<br /><em>I want to ask you.</em></h1>
          <p className="lead">Not because I need a perfect moment. Because I want to make the moment ours.</p>
          <section className="card intro-card">
            <span className="tiny">THE SHORT VERSION</span>
            <p>I like you. A lot. And I do not want this to be some vague little “so… what are we?” situation.</p>
            <p>I want to choose you properly.</p>
            <button className="text-button" onClick={() => setShowSecret(!showSecret)}>{showSecret ? "Okay okay, hide it 🙈" : "Psst... there is a secret button"}</button>
            {showSecret && <div className="secret-note">Congratulations. You found absolutely nothing useful. Except proof that I know you are curious. ♡</div>}
          </section>
          <section className="fun-zone">
            <div className="section-label">BEFORE YOU ANSWER...</div>
            <div className="fun-grid">
              <article className="card fun-card">
                <span className="tiny">REASON #∞</span>
                <p className="big-reason">I want you <em>{reason}</em>.</p>
                <button className="mini-button" onClick={nextReason}>Give me another reason ✦</button>
              </article>
              <article className="card fun-card date-card">
                <span className="tiny">OUR FIRST LITTLE MISSION</span>
                <div className="date-icon">{dateIdeas[dateIndex][0]}</div>
                <h2>{dateIdeas[dateIndex][1]}</h2>
                <p>{dateIdeas[dateIndex][2]}</p>
                <button className="mini-button" onClick={nextDate}>Spin the date wheel ↻</button>
              </article>
            </div>
          </section>
          <section className="commitments">
            <div className="section-label">Some things I am promising</div>
            {commitments.map(([title, body], i) => (
              <article className="commitment" key={title} style={{ animationDelay: `${i * 90}ms` }}>
                <span>0{i + 1}</span><div><h2>{title}</h2><p>{body}</p></div>
              </article>
            ))}
          </section>
          <section className="card letter">
            <button className="letter-top" onClick={() => setOpened(!opened)} aria-expanded={opened}>
              <span>💌</span><div><b>{opened ? "THE LETTER IS OPEN" : "YOU HAVE MAIL"}</b><small>{opened ? "Okay, you can read it now." : "Tap to open the suspiciously romantic envelope."}</small></div><strong>{opened ? "×" : "OPEN"}</strong>
            </button>
            {opened && <div className="letter-body">
              <p>Hey you.</p><p>I could have made this simple. I could have just asked. But you deserve a little theatre sometimes.</p><p>So here I am, putting my feelings on a whole website like a completely normal person.</p><p>Whatever happens next, I want it to be honest, mutual and ours.</p><p className="signature">Theo ♡</p>
            </div>}
          </section>
          <section className="pact card">
            <div className="stamp">OFFICIAL(ISH)</div><span className="tiny">THE BOYFRIEND PACT</span>
            <h2>Terms & conditions<br /><em>of being mine to love.</em></h2>
            <div className="terms">{pact.map((item, i) => <p key={i}><b>{i + 1}.</b>{item}</p>)}</div>
            <p className="fine">Fine print: this pact is powered by communication, consent, affection, ridiculous laughter and the mutual decision to keep showing up.</p>
          </section>
          <section className="question">
            <div className="spark">✦</div><p>Okay. Enough legal nonsense.</p>
            <h2>Will you be<br /><em>my girlfriend?</em></h2>
            <div className="actions"><button className="yes" onClick={sayYes}>YES. ♡</button></div>
            <p className="micro">No pressure. Your answer should be yours.</p>
          </section>
          <footer>made with entirely too much affection · {time % 2 ? "♡" : "✦"}</footer>
        </section>
      ) : (
        <>
          <Confetti />
          <section className="shell success-shell">
            <div className="success-heart">♥</div><div className="eyebrow">IT'S OFFICIAL</div>
            <h1>My girlfriend.<br /><em>That sounds nice.</em></h1>
            <p className="lead">Now we do one tiny bit of setup so Genesis knows where to find you and who you chose.</p>
            <div className="celebrate-card card"><span>BREAKING NEWS</span><h2>Girl says yes. Local boy becomes unbearable.</h2><p>Sources close to the situation confirm he is already smiling at his screen.</p></div>
            <section className="steps">
              <article className="step card"><span>01</span><div><h2>Turn on location sharing</h2><p>Open Genesis and allow location access when your phone asks. That lets the app use your location for the features we built together.</p></div></article>
              <article className="step card"><span>02</span><div><h2>Add his Firebase UID</h2><p>In your Genesis profile, paste this into the Partner Firebase UID field.</p><div className="uid"><code>{MY_UID}</code><button onClick={copyUid}>{copied ? "COPIED ✓" : "COPY"}</button></div></div></article>
            </section>
            <a className="enter" href={GENESIS_URL}>ENTER GENESIS <span>→</span></a>
            <p className="micro">Go on. Your boyfriend is waiting. ♡</p>
          </section>
        </>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
