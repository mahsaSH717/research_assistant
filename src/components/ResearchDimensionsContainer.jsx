import ReaserchDimension from "./ResearchDimension";
import styles from "./ResearchDimensionsContainer.module.css"

export default function ReaserchDimensionsContainer({ prompt, definitionsData, onChangeInfo, onDimensionSelection,onDeleteDimension }) {

    return (
        definitionsData && (
            <>

                <div className={styles.container}>
                    {Object.entries(definitionsData).map(([key, value]) =>
                        <ReaserchDimension
                            prompt={prompt}
                            key={key}
                            name={key}
                            description={value}
                            onChangeInfo={onChangeInfo}
                            onDimensionSelection={onDimensionSelection}
                            onDeleteDimension={onDeleteDimension} />)}
                </div>
            </>
        )
    );
}