import FAButton from "../FAButton";

function FALink({ href, fontawesomeClasses }) {
  return (
    <div className="FALink">
      <a href={href} target="_blank">
        <FAButton action={null} fontawesomeClasses={fontawesomeClasses}></FAButton>
      </a>
    </div>
  )
}

export default FALink;