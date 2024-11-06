import { useEffect } from 'react';

const Quotes = ({ quotes }) => {
  const splitQuotes = (quotes) => {
    if (quotes.length <= 7) {
      return [quotes];
    } else if (quotes.length <= 14) {
      const half = Math.ceil(quotes.length / 2);
      return [
        quotes.slice(0, half),
        quotes.slice(half)
      ];
    } else {
      const third = Math.ceil(quotes.length / 3);
      return [
        quotes.slice(0, third),
        quotes.slice(third, third * 2),
        quotes.slice(third * 2)
      ];
    }
  };

  useEffect(() => {
    const messagesContainers = document.querySelectorAll(".messages");
    const quotesGroups = splitQuotes(quotes);
    
    messagesContainers.forEach(container => {
      const slides = container.querySelectorAll(".quotes-slide");
      slides.forEach(slide => {
        slide.remove();
      });
    });

    messagesContainers.forEach((container, index) => {
      const quotesSlide = document.createElement("div");
      quotesSlide.className = "quotes-slide";
      
      if (quotesGroups[index]?.length > 0) {
        quotesGroups[index].forEach((quote) => {
          const quoteDiv = document.createElement("div");
          quoteDiv.className = "quote";
          quoteDiv.innerHTML = `
            <p>"${quote.message}"</p>
            <p class="quote-details">
              - ${quote.name} (${new Date(quote.time).toLocaleDateString()})
            </p>
          `;
          quotesSlide.appendChild(quoteDiv);
        });

        container.appendChild(quotesSlide);

        setTimeout(() => {
          const totalWidth = Array.from(quotesSlide.children)
            .reduce((sum, quote) => sum + quote.offsetWidth + 10, 0);
          
          const copy = quotesSlide.cloneNode(true);
          container.appendChild(copy);

          container.style.setProperty('--slide-width', `${totalWidth}px`);
          const duration = totalWidth / 80;
          container.style.setProperty('--slide-duration', `${duration}s`);
        }, 0);
      }
    });
  }, [quotes]);

  return (
    <div className="carousels-container">
      {splitQuotes(quotes).map((quoteGroup, groupIndex) => (
        <div key={groupIndex} className="messages">
          <div className="quotes-slide">
            {quoteGroup.map((quote, index) => (
              <div key={`${groupIndex}-${index}`} className="quote">
                <p>"{quote.message}"</p>
                <p className="quote-details">
                  - {quote.name} ({new Date(quote.time).toLocaleDateString()})
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quotes;