import { useEffect, useState } from "react";

const RSVP_STORAGE_KEY = "wedding_invite_rsvp_v1";

const stars = [
  { x: "12%", y: "18%", size: "7px", delay: "0s", duration: "2.2s" },
  { x: "24%", y: "74%", size: "6px", delay: "0.35s", duration: "2.7s" },
  { x: "38%", y: "28%", size: "8px", delay: "0.7s", duration: "2.4s" },
  { x: "46%", y: "66%", size: "6px", delay: "0.15s", duration: "2.9s" },
  { x: "58%", y: "22%", size: "7px", delay: "1s", duration: "2.3s" },
  { x: "66%", y: "80%", size: "6px", delay: "1.35s", duration: "2.8s" },
  { x: "78%", y: "34%", size: "8px", delay: "1.7s", duration: "2.5s" },
  { x: "86%", y: "70%", size: "6px", delay: "2s", duration: "2.6s" },
  { x: "91%", y: "16%", size: "7px", delay: "1.15s", duration: "2.1s" },
  { x: "8%", y: "54%", size: "7px", delay: "1.85s", duration: "2.45s" },
  { x: "18%", y: "40%", size: "6px", delay: "2.2s", duration: "2.35s" },
  { x: "29%", y: "12%", size: "5px", delay: "0.95s", duration: "2.75s" },
  { x: "34%", y: "86%", size: "7px", delay: "2.4s", duration: "2.2s" },
  { x: "49%", y: "44%", size: "5px", delay: "1.55s", duration: "2.85s" },
  { x: "61%", y: "58%", size: "7px", delay: "0.5s", duration: "2.5s" },
  { x: "72%", y: "10%", size: "6px", delay: "1.9s", duration: "2.4s" },
  { x: "83%", y: "46%", size: "5px", delay: "2.05s", duration: "2.65s" },
  { x: "94%", y: "60%", size: "6px", delay: "0.65s", duration: "2.3s" },
  { x: "6%", y: "30%", size: "5px", delay: "1.25s", duration: "2.55s" }
];

const eventDetails = {
  couple: "Aiman & Maha",
  date: "Sunday, June 14, 2026",
  time: "4:00 PM",
  venue: "Fox Event Center",
  location: "123 Cajon Street, Redlands, CA 92373",
  website: "https://foxeventcenter.com/",
  rsvpDeadline: "May 20, 2026",
  dressCode: "Formal",
  dinner: "Reception dinner and dancing to follow"
};

const scheduleItems = [
  { time: "3:30 PM", label: "Guest arrival and welcome" },
  { time: "4:00 PM", label: "Ceremony begins" },
  { time: "5:00 PM", label: "Family photos and greetings" },
  { time: "6:00 PM", label: "Dinner service" },
  { time: "7:30 PM", label: "Toasts and celebration" },
  { time: "9:30 PM", label: "Evening farewell" }
];

const travelItems = [
  {
    title: "Parking",
    body: "Complimentary guest parking is available at Fox Event Center. Arrive 20-30 minutes early."
  },
  {
    title: "Airport",
    body: "The closest major airport is Ontario International Airport (ONT), about 25-30 minutes away."
  },
  {
    title: "Stay Nearby",
    body: "Hotels are available in Redlands and nearby Loma Linda. Book early for best rates."
  },
  {
    title: "Rideshare",
    body: "Please use rideshare drop-off at the front entrance of the venue."
  }
];

const faqs = [
  {
    question: "When should I arrive?",
    answer: "Please arrive by 3:30 PM so everyone is seated before the ceremony begins at 4:00 PM."
  },
  {
    question: "What is the dress code?",
    answer: "Formal attire is kindly requested."
  },
  {
    question: "Can I bring children?",
    answer: "Please refer to your invitation for guest details. Reach out if you need clarification."
  },
  {
    question: "Can I take photos during the ceremony?",
    answer: "We invite everyone to be present during the ceremony. Photos can be shared during the reception."
  }
];

function getCountdownText() {
  const today = new Date();
  const target = new Date("2026-06-14T16:00:00");
  const diffMs = target.getTime() - today.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (days > 1) return `${days} days to go`;
  if (days === 1) return "1 day to go";
  if (days === 0) return "Today is the day";
  return "Our day has arrived";
}

export default function App() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStoredRsvp, setHasStoredRsvp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    partnerName: "",
    attending: "yes",
    guestCount: "2",
    dietary: "",
    message: ""
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RSVP_STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (parsed?.submitted && parsed?.formData) {
        setFormData((prev) => ({ ...prev, ...parsed.formData }));
        setIsSubmitted(true);
        setHasStoredRsvp(true);
      }
    } catch {
      localStorage.removeItem(RSVP_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setIsRsvpOpen(false);
      }
    }

    if (isRsvpOpen) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isRsvpOpen]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
    setHasStoredRsvp(true);
    localStorage.setItem(
      RSVP_STORAGE_KEY,
      JSON.stringify({
        submitted: true,
        submittedAt: new Date().toISOString(),
        formData
      })
    );
  }

  function closeModal() {
    setIsRsvpOpen(false);
  }

  function editRsvp() {
    setIsSubmitted(false);
    setIsRsvpOpen(true);
  }

  function clearRsvp() {
    localStorage.removeItem(RSVP_STORAGE_KEY);
    setHasStoredRsvp(false);
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      partnerName: "",
      attending: "yes",
      guestCount: "2",
      dietary: "",
      message: ""
    });
  }

  return (
    <main className="site">
      <header className="top-nav">
        <nav aria-label="Page sections">
          <a href="#home">Home</a>
          <a href="#details">Details</a>
          <a href="#schedule">Schedule</a>
          <a href="#travel">Travel</a>
          <a href="#faq">FAQ</a>
          <a href="#photos">Photos</a>
          <a href="#gift">Gift</a>
          <a href="#blessing">Blessing</a>
          <a href="#rsvp">RSVP</a>
        </nav>
      </header>

      <section className="panel hero" id="home">
        <div className="content">
          <p className="kicker">Together with their families</p>
          <h1 className="couple">{eventDetails.couple}</h1>
          <p className="invite-line">joyfully invite you to celebrate their wedding</p>
          <p className="date-emphasis">{eventDetails.date}</p>
          <p className="countdown-badge">{getCountdownText()}</p>
          <div className="photo-pair">
            <figure className="photo-slot wide">
              <div className="photo-placeholder" aria-hidden="true">
                Add Aiman and Maha Photo
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="panel" id="schedule">
        <div className="content">
          <h2>Schedule</h2>
          <div className="timeline">
            {scheduleItems.map((item) => (
              <article key={item.time} className="timeline-item">
                <p className="timeline-time">{item.time}</p>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel" id="details">
        <div className="content">
          <h2>Wedding Details</h2>
          <div className="details-grid" aria-label="Wedding details">
            <article className="detail-block">
              <h3>Date</h3>
              <p>{eventDetails.date}</p>
            </article>
            <article className="detail-block">
              <h3>Time</h3>
              <p>{eventDetails.time}</p>
            </article>
            <article className="detail-block">
              <h3>Venue</h3>
              <p>{eventDetails.venue}</p>
            </article>
            <article className="detail-block">
              <h3>Location</h3>
              <p>{eventDetails.location}</p>
              <p>
                <a href={eventDetails.website} target="_blank" rel="noreferrer">
                  Venue Website
                </a>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="panel" id="travel">
        <div className="content">
          <h2>Travel & Parking</h2>
          <div className="details-grid" aria-label="Travel and logistics details">
            {travelItems.map((item) => (
              <article className="detail-block" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel" id="faq">
        <div className="content">
          <h2>FAQ</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel" id="photos">
        <div className="content">
          <h2>Our Photos</h2>
          <div className="photo-grid" aria-label="Couple photo placeholders">
            <figure className="photo-slot wide">
              <div className="photo-placeholder" aria-hidden="true">
                Add Couple Photo 1
              </div>
              <figcaption>Engagement Portrait</figcaption>
            </figure>
            <figure className="photo-slot">
              <div className="photo-placeholder" aria-hidden="true">
                Add Couple Photo 2
              </div>
              <figcaption>Golden Hour</figcaption>
            </figure>
            <figure className="photo-slot">
              <div className="photo-placeholder" aria-hidden="true">
                Add Couple Photo 3
              </div>
              <figcaption>Celebration</figcaption>
            </figure>
            <figure className="photo-slot wide">
              <div className="photo-placeholder" aria-hidden="true">
                Add Couple Photo 4
              </div>
              <figcaption>Family Gathering</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="panel" id="gift">
        <div className="content">
          <h2>Gift Note</h2>
          <p className="story-copy">
            Your prayers, love, and presence on our wedding day are the most meaningful gift we could receive.
          </p>
        </div>
      </section>

      <section className="panel" id="blessing">
        <div className="content">
          <h2>Blessing</h2>
          <p className="story-copy">
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="story-copy">
            May Allah bless your union, shower His mercy upon you, and unite you always in goodness.
          </p>
        </div>
      </section>

      <section className="panel rsvp-panel" id="rsvp">
        <div className="content">
          <h2>RSVP</h2>
          <p>Kindly respond by {eventDetails.rsvpDeadline}.</p>
          <button className="rsvp-btn" type="button" onClick={() => setIsRsvpOpen(true)}>
            {hasStoredRsvp ? "View RSVP" : "Open RSVP Form"}
          </button>
        </div>
      </section>

      {isRsvpOpen && (
        <div className="modal-backdrop" role="presentation" onClick={closeModal}>
          {isSubmitted && (
            <div className="starscape" aria-hidden="true">
              {stars.map((star, index) => (
                <span
                  key={index}
                  className="star"
                  style={{
                    "--x": star.x,
                    "--y": star.y,
                    "--size": star.size,
                    "--delay": star.delay,
                    "--duration": star.duration
                  }}
                />
              ))}
            </div>
          )}
          <section
            className="rsvp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <h3 id="rsvp-title">RSVP Form</h3>
              <button type="button" className="icon-close" onClick={closeModal} aria-label="Close form">
                x
              </button>
            </div>

            {isSubmitted ? (
              <div className="submit-state">
                <p>Thank you. Your RSVP was recorded on this page.</p>
                <p className="submit-note">Backend submission can be connected next.</p>
                <div className="modal-actions">
                  <button type="button" className="rsvp-btn" onClick={editRsvp}>
                    Edit RSVP
                  </button>
                  <button type="button" className="rsvp-btn secondary-btn" onClick={clearRsvp}>
                    Clear RSVP
                  </button>
                </div>
              </div>
            ) : (
              <form className="rsvp-form" onSubmit={handleSubmit}>
                <label>
                  Full name
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Spouse/Guest name
                  <input
                    type="text"
                    name="partnerName"
                    value={formData.partnerName}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Will you attend?
                  <select name="attending" value={formData.attending} onChange={handleChange}>
                    <option value="yes">Yes, we will attend</option>
                    <option value="no">No, we cannot attend</option>
                  </select>
                </label>

                <label>
                  Number of guests
                  <select name="guestCount" value={formData.guestCount} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </label>

                <label>
                  Dietary preferences
                  <textarea
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Allergies or dietary preferences"
                  />
                </label>

                <label>
                  Message for the couple
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Optional note"
                  />
                </label>

                <button type="submit" className="rsvp-btn submit-btn">
                  Submit RSVP
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
