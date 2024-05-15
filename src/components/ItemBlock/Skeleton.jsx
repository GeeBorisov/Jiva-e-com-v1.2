import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
  className="item-block"
    speed={2}
    width={280}
    height={474}
    viewBox="0 0 300 474"
    backgroundColor="#444444"
    foregroundColor="#606060"
    {...props}
  >
    <rect x="46" y="285" rx="5" ry="5" width="180" height="40" /> 
    <rect x="1" y="339" rx="6" ry="6" width="280" height="50" /> 
    <rect x="11" y="415" rx="0" ry="0" width="78" height="27" /> 
    <rect x="126" y="405" rx="29" ry="29" width="152" height="44" /> 
    <rect x="11" y="-9" rx="5" ry="5" width="260" height="280" />
  </ContentLoader>
)

export default Skeleton



