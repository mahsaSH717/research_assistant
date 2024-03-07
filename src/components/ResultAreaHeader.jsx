import styles from './ResultAreaHeader.module.css';
import { CSVLink } from "react-csv";

export default function ResultAreaHeader({ title, mainTableData, definitionsData, isMainHeader }) {

    const mainTableDisabledStyle = !mainTableData ? 'disabled' : '';
    const definitionsDataDisabledStyle = !definitionsData ? 'disabled' : '';
    return (
        <div className={isMainHeader ? styles.mainResultHeader : styles.resultHeader}>

            <h4>{title}</h4>
            {isMainHeader &&
                <div>
                    <CSVLink
                        data={
                            mainTableData?
                            mainTableData.map((item) => {
                                const outputObject = {
                                    dimension: item.dimension,
                                };
                                item.values.forEach((valueItem) => {
                                    outputObject[valueItem.context] = " "+ (valueItem.value);
                                });
                                return outputObject;
                            })
                            :''
                        }
                        filename={"comparison.csv"}
                        className={` ${mainTableDisabledStyle} btn btn-secondary ${styles.btnMain}`}
                        target="_blank"
                    >
                        Export Comparison
                    </CSVLink>

                    <CSVLink
                        disabled={!definitionsData}
                        data={Object.entries(definitionsData).map(([key, value]) => ({
                            dimension: key,
                            description: value
                        }))}
                        filename={"dimensions.csv"}
                        className={`${definitionsDataDisabledStyle} btn btn-secondary ${styles.btnMain}`}
                        target="_blank"
                    >
                        Export Dimensions
                    </CSVLink>
                </div>
            }
        </div>
    )
}