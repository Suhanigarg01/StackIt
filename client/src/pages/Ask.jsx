import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const TAG_OPTIONS = ['React', 'JWT', 'JavaScript', 'Node.js', 'CSS', 'HTML'];

const Ask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {

    const res = await fetch('http://localhost:5050/api/questions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title, description, tags }),
})

    const data = await res.json()

    if (res.ok) {
      alert('✅ Question submitted!')
      console.log(data)
      // Optionally clear form
      setTitle('')
      setDescription('')
      setTags([])
    } else {
      alert('❌ Submission failed: ' + data.error)
    }
  } catch (err) {
    console.error('Error:', err)
    alert('❌ Something went wrong!')
  }
}


  return (
    <>
      {/* <Navbar /> */}
      <div style={styles.spacer} />
      <div className='pt-36' style={styles.container}>
        <h2 style={styles.heading}>📝 Ask a Question</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to use React hooks?"
              required
              style={styles.input}
            />
          </div>

          {/* Description */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <div style={styles.quillWrapper}>
              <ReactQuill
                value={description}
                onChange={setDescription}
                placeholder="Enter a detailed explanation of your question..."
                style={styles.quill}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Tags</label>
            <div style={styles.tagContainer}>
              {TAG_OPTIONS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    ...styles.tagButton,
                    backgroundColor: tags.includes(tag) ? '#007bff' : '#f0f0f0',
                    color: tags.includes(tag) ? '#fff' : '#333',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" style={styles.submitButton}>
            Submit Question
          </button>
        </form>
      </div>
      {/* </div> */}
      {/* <Footer /> */}
    </>
  );
};

export default Ask;

// 🎨 Styles
const styles = {
  spacer: {
    height: '80px', // Space for fixed navbar
  },
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '24px',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    padding: '10px 12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  quillWrapper: {
    marginTop: '4px',
    marginBottom: '24px',
  },
  quill: {
    height: '150px',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '8px',
  },
  tagButton: {
    padding: '8px 14px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease-in-out',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '16px',
    transition: 'background-color 0.3s',
  },
};
