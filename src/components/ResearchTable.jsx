import { useState, useEffect } from 'react';
import styles from './ResearchTable.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ImCross } from "react-icons/im";


const ResearchTable = ({ mainTableData, onUpdateTableData, onUpdateDimensions }) => {
  const dimensions = mainTableData || [];
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [editedHeaders, setEditedHeaders] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [newDimensionName, setNewDimensionName] = useState('');

  const handleAddColumn = () => {
    if (newColumnName.trim() === '') {
      alert('Please enter a header.');
      return;
    }

    const updatedMainTableData = dimensions.map((dimensionData) => ({
      ...dimensionData,
      values: [
        ...dimensionData.values,
        {
          context: newColumnName,
          value: '',
        },
      ],
    }));
    onUpdateTableData(updatedMainTableData);
    setNewColumnName('');
  };


  const handleAddRow = () => {
    if (newDimensionName.trim() === '') {
      alert('Please enter the dimension name.');
      return;
    }
    const newDimension = {
      dimension: newDimensionName,
      values: getAllContexts().map((context) => ({
        context,
        value: '',
      })),
    };

    const updatedMainTableData = [...dimensions, newDimension];
    onUpdateTableData(updatedMainTableData);
    onUpdateDimensions(newDimensionName);
    setNewDimensionName('');

  };

  useEffect(() => {
    setEditedValues({});
    setEditedHeaders([]);
  }, [editMode]);

  const getAllContexts = () => {
    const allContexts = new Set();
    dimensions.forEach((dimension) => {
      dimension.values.forEach((item) => {
        allContexts.add(item.context);
      });
    });
    return Array.from(allContexts);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleValueChange = (dimension, context, newValue) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [`${dimension}-${context}`]: newValue,
    }));
  };

  const handleHeaderChange = (context, newValue) => {
    setEditedHeaders((prevHeaders) => ({
      ...prevHeaders,
      [context]: newValue,
    }));
  };

  const handleSaveChanges = () => {
    const updatedMainTableData = dimensions.map((dimensionData) => ({
      ...dimensionData,
      values: dimensionData.values.map((item) => ({
        ...item,
        value: editedValues[`${dimensionData.dimension}-${item.context}`] || item.value,
      })),
    }));

    getAllContexts().map((context) => {
      const newContext = editedHeaders[context] || context;
      updatedMainTableData.forEach((dimensionData) => {
        dimensionData.values.forEach((item) => {
          if (item.context === context) {
            item.context = newContext;
          }
        });
      });
      return newContext;
    });
    onUpdateTableData(updatedMainTableData);
    setEditMode(false);
  };

  const handleDelete = (context) => {
    const updatedData = mainTableData.map(item => {
      const updatedValues = item.values.filter(value => value.context !== context);
      return { ...item, values: updatedValues };
    });

    onUpdateTableData(updatedData);

  };

  const renderTableHeaders = () => {
    const allContexts = getAllContexts();
    if (allContexts.length > 0) {
      return (
        <tr>
          <th>Research Dimension</th>
          {allContexts.map((context) => (
            <th key={context}>
              {editMode ? (
                <Form.Control
                  type="text"
                  value={editedHeaders[context] || context}
                  onChange={(e) => handleHeaderChange(context, e.target.value)}
                />
              ) : (
                <div className={styles.tableHeaderDiv}>
                  {context}
                  <ImCross
                    className={styles.iconDelete}
                    onClick={() => handleDelete(context)}
                  /></div>

              )}
            </th>
          ))}
        </tr>
      );
    }
    else {
      return (
        <tr>
          <th>Research Dimension</th>
        </tr>
      );

    }
  };

  const renderTableRows = () => {
    return dimensions.map((dimensionData) => (
      <tr key={dimensionData.dimension}>
        <td>{dimensionData.dimension}</td>
        {getAllContexts().map((context) => {
          const isEditable = editMode && context !== 'Research Dimension';
          const value = editedValues[`${dimensionData.dimension}-${context}`] || dimensionData.values.find((item) => item.context === context);

          return (
            <td key={context}>
              {isEditable ? (
                <Form.Control
                  type="text"
                  value={value ? value.value : ''}
                  onChange={(e) => handleValueChange(dimensionData.dimension, context, e.target.value)}
                />
              ) : (
                value ? value.value : ''
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (

    <>
      <div className={styles.editButtonContainer}>
        {editMode ? (
          <Button variant='secondary' onClick={handleSaveChanges} className={styles.editBtn}>Save Changes</Button>
        ) : (
          <>
            <Button variant='secondary' onClick={handleEditClick} className={styles.editBtn}>Edit Table</Button>
            <InputGroup>
              <Form.Control
                className={styles.columnInput}
                type="text"
                placeholder="Enter header name"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
              />
              <Button variant='secondary' onClick={handleAddColumn} className={styles.addColumnBtn}>Add Column</Button>
            </InputGroup>

            <InputGroup>
              <Form.Control
                className={styles.columnInput}
                type="text"
                placeholder="Enter dimension name"
                value={newDimensionName}
                onChange={(e) => setNewDimensionName(e.target.value)}
              />
              <Button variant='secondary' onClick={handleAddRow} className={styles.addColumnBtn}>Add Row</Button>
            </InputGroup>
          </>
        )}
      </div>
      <div className={styles.tableCont}>
        <table className={styles.table}>
          <thead>{renderTableHeaders()}</thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </>
  );
};

export default ResearchTable;