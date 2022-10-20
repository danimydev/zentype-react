import './App.css';
import { useState, useRef, useEffect } from 'react';
import FAButton from './components/FAButton';
import FALink from './components/FALink';
import ToggleFullScreenButton from './components/ToggleFullScreenButton';
import buildDownloadFunction from './utils/build_download';
import HTML from './utils/html';
import CSS from './utils/css';

const downloadFile = buildDownloadFunction();

const THEMES = {
  dark: {
    className: 'darkTheme',
    background: '#111111',
    color: '#f0f0f0',
  },
  light: {
    className: 'lightTheme',
    background: '#f0f0f0',
    color: '#111111',
  }
}

const DEFAULT_STYLE = {
  font: {
    name: 'Lora',
    url: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap',
  },
  body: {
    margin: '0px auto',
    padding: '30px 0px',
    maxWidth: '600px',
    fontSize: '1.2em',
  },
  theme: THEMES.light,
}

function App() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleElement = useRef(null);
  const articleElement = useRef(null);
  const themeContainer = useRef(null);

  useEffect(() => {
    if (titleElement.current) {
      titleElement.current.focus();
    }
  }, []);

  function toggleTheme(e) {
    e.preventDefault();
    themeContainer.current.classList.toggle(THEMES.dark.className);
  }

  function saveAsHTML(e) {
    e.preventDefault();

    //handles content
    const header = HTML.header(HTML.h1(title));
    const main = HTML.main(HTML.article(content));
    const body = HTML.body(`${header}${main}`);

    //handle styles
    const theme = themeContainer.current.classList.contains(THEMES.dark.className) ? 'dark' : 'light';
    const styles = `
    ${CSS.import(DEFAULT_STYLE.font.url)}
    ${CSS.tag(
      'body',
      [
        CSS.style('font-family', DEFAULT_STYLE.font.name),
        CSS.style('font-size', DEFAULT_STYLE.body.fontSize),
        CSS.style('max-width', DEFAULT_STYLE.body.maxWidth),
        CSS.style('margin', DEFAULT_STYLE.body.margin),
        CSS.style('background-color', THEMES[theme].background),
        CSS.style('color', THEMES[theme].color),
        CSS.style('padding', '20px 0px'),
      ]
    )}
    `;

    const fileData = HTML.DOCTYPE(HTML.html(`${body}${HTML.style(styles)}`));

    downloadFile({
      data: fileData,
      fileName: 'index.html',
    });
  }

  function enterPressedOnTitle(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      articleElement.current.focus();
    }
  }

  function tabPressedOnArticle(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  }

  return (
    <div className="App" ref={themeContainer}>

      <div className="Sidebar">
        <div className="actionBtn">
          <ToggleFullScreenButton></ToggleFullScreenButton>
        </div>
        <div className="actionBtn">
          <FAButton
            action={toggleTheme}
            fontawesomeClasses={'fa-solid fa-circle-half-stroke fa-xl'}>
          </FAButton>
        </div>
        <div className="actionBtn">
          <FAButton
            action={saveAsHTML}
            fontawesomeClasses={'fa-solid fa-download fa-xl'}>
          </FAButton>
        </div>
        <div className="links">
          <div className='actionBtn githubLink'>
            <FALink
              fontawesomeClasses={'fa-brands fa-github-alt fa-xl'}
              href={'https://www.github.com/danimydev'}>
            </FALink>
          </div>
        </div>
      </div>

      <div className="Editor">
        <h1
          contentEditable="true"
          onInput={(e) => setTitle(e.target.innerHTML)}
          onKeyDown={enterPressedOnTitle}
          ref={titleElement}
        >
        </h1>
        <article
          contentEditable="true"
          onInput={(e) => setContent(e.target.innerHTML)}
          onKeyDown={tabPressedOnArticle}
          ref={articleElement}
        >
        </article>
      </div>

    </div>
  );
}

export default App;
