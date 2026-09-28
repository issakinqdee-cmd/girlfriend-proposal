import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import "./styles.css";

const GENESIS_URL = "https://ourgenesis-six.vercel.app/";
const MY_UID = "cymFAhjKyRPg66o26ppFtb7QhVO2";

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

function App() {
  const [accepted, setAccepted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime((v) => v + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const sayYes = async () => {
    setSaving(true);
    try {
      await addDoc(collection(db, "proposal_responses"), {
        proposal: "girlfriend",
        answer: "yes",
        createdAt: serverTimestamp(),
        source: window.location.href,
        userAgent: navigator.userAgent
      });
      setAccepted(true);
    } catch (error) {
      console.error(error);
      alert("The universe tripped for a second 😭. Try the YES button again.");
    } finally {
      setSaving(false);
    }
  };

  const copyUid = async () => {
    await navigator.clipboard.writeText(MY_UID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="page">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

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
          </section>

          <section className="commitments">
            <div className="section-label">Some things I am promising</div>
            {commitments.map(([title, body], i) => (
              <article className="commitment" key={title} style={{ animationDelay: `${i * 90}ms` }}>
                <span>0{i + 1}</span>
                <div><h2>{title}</h2><p>{body}</p></div>
              </article>
            ))}
          </section>

          <section className="pact card">
            <div className="stamp">OFFICIAL(ISH)</div>
            <span className="tiny">THE BOYFRIEND PACT</span>
            <h2>Terms & conditions<br /><em>of being mine to love.</em></h2>
            <div className="terms">
              {pact.map((item, i) => <p key={i}><b>{i + 1}.</b>{item}</p>)}
            </div>
            <p className="fine">Fine print: this pact is powered by communication, consent, affection, ridiculous laughter and the mutual decision to keep showing up.</p>
          </section>

          <section className="question">
            <div className="spark">✦</div>
            <p>Okay. Enough legal nonsense.</p>
            <h2>Will you be<br /><em>my girlfriend?</em></h2>
            <div className="actions">
              <button className="yes" onClick={sayYes} disabled={saving}>{saving ? "Saving our moment..." : "YES. ♡"}</button>
            </div>
            <p className="micro">No pressure. Your answer should be yours.</p>
          </section>

          <footer>made with entirely too much affection · {time % 2 ? "♡" : "✦"}</footer>
        </section>
      ) : (
        <section className="shell success-shell">
          <div className="success-heart">♥</div>
          <div className="eyebrow">IT'S OFFICIAL</div>
          <h1>My girlfriend.<br /><em>That sounds nice.</em></h1>
          <p className="lead">Now we do one tiny bit of setup so Genesis knows where to find you and who you chose.</p>

          <section className="steps">
            <article className="step card"><span>01</span><div><h2>Turn on location sharing</h2><p>Open Genesis and allow location access when your phone asks. That lets the app use your location for the features we built together.</p></div></article>
            <article className="step card"><span>02</span><div><h2>Add his Firebase UID</h2><p>In your Genesis profile, paste this into the Partner Firebase UID field.</p><div className="uid"><code>{MY_UID}</code><button onClick={copyUid}>{copied ? "COPIED ✓" : "COPY"}</button></div></div></article>
          </section>

          <a className="enter" href={GENESIS_URL}>ENTER GENESIS <span>→</span></a>
          <p className="micro">Go on. Your boyfriend is waiting. ♡</p>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);