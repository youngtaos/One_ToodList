import React from "react";
import styles from "./index.module.css";

interface CustomListProps {
  dataSource: any[];
  renderItem: (item: any) => React.ReactNode;
}

const CustomList: React.FC<CustomListProps> = ({ dataSource, renderItem }) => {
  return (
    <div className={styles.customList}>
      {dataSource.length === 0 && (
        <div className={styles.emptyItem}>No task found!</div>
      )}
      {dataSource.map((item, index) => (
        <div key={index} className={styles.customListItem}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default CustomList;
