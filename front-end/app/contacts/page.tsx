import Layout from '../layout';

export default function ContactsPage() {
  return (
    <Layout>
      <section className="Contacts">
        <h1 className="Contacts__head">Contacts Us</h1>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.773043524813!2d30.474409350350303!3d50.43429255805559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce951840008b%3A0x993ce5991eb4a780!2z0L_QtdGALiDQndC40LrQvtC70LDRjyDQntGB0YLRgNC-0LLRgdC60L7Qs9C-LCAzLCDQmtC40LXQsiwgMDMwMzU!5e0!3m2!1sru!2sua!4v1710350919922!5m2!1sru!2sua"
          width="100%"
          height="600"
          style={{ border: '0' }}
          loading="lazy"
        ></iframe>
      </section>
    </Layout>
  );
}
