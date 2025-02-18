import { parse } from 'json2csv';

// Function to export tasks to CSV format
const exportToCSV = (tasks) => {
  try {
    const csv = parse(tasks);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tasks.csv';
    link.click();
  } catch (error) {
    console.error("Error exporting to CSV: ", error);
  }
};

export default exportToCSV;
