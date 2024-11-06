import React from 'react';
import quotebookLogo from '../assets/quotebook.jpg';

const Header = ({ showForm, setShowForm, handleSubmit, isClosing, handleCloseForm }) => {
  return (
    <nav className="nav">
      <div className="logo-container">
        <img src={quotebookLogo} alt="logo" />
        <h1>HackUCI Quotebook</h1>
      </div>
      <div className="add-quote-container">
        {!showForm && <button onClick={() => setShowForm(!showForm)}>Add A Quote</button>}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className={`inputs-container ${isClosing ? 'sliding-out' : ''}`}>
                <button type="button" className="close-button" onClick={handleCloseForm}>×</button>
                <input placeholder="Name..." type="text" name="name" id="input-name" maxLength={20} required />
                <input placeholder="Quote..." type="text" name="message" id="input-message" maxLength={450} required />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Header;