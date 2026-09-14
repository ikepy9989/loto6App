import type { CSSProperties } from 'react'

export const styles: Record<string, CSSProperties> = {
  
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#222',
    padding: '0 30px 30px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    margin: '0 0 15px',
    fontSize: '20px',
    textAlign: 'left'
  },

  footer: {
    marginTop: 'auto',
    padding: '20px 0 0',
    borderTop: '1px solid #ddd',
    textAlign: 'right',
  },

  main: {
    flex: 1,
  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
  },

  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
  },

  table: {
    width: 'max-content',
    borderCollapse: 'collapse' as const,
    backgroundColor: '#fff',
    tableLayout: 'auto' as const,
    border: '1px solid #999999',
  },

  th: {
    padding: '3px',
    backgroundColor: '#949bff',
    color: '#222',
    border: '1px solid #000000',
    textAlign: 'left' as const,
    whiteSpace: 'nowrap' as const,
    fontWeight: 'bold',
  },

  td_num: {
    width: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '3px',
    color: '#222',
    backgroundColor: '#fff',
    border: '1px solid #000000',
    textAlign: 'left' as const,
  },

  td: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '3px',
    color: '#222',
    backgroundColor: '#fff',
    border: '1px solid #000000',
    textAlign: 'left' as const,
  },
  tr: {
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    textAlign: 'left' as const,
  },

  td_name: {
    maxWidth: '120px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '3px',
    color: '#222',
    backgroundColor: '#fff',
    border: '1px solid #000000',
    textAlign: 'left' as const,
  },

  td_date: {
    maxWidth: '120px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '3px',
    color: '#222',
    backgroundColor: '#fff',
    border: '1px solid #000000',
    textAlign: 'left' as const,
  },

  empty: {
    color: '#666',
  },

  error: {
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#ffe5e5',
    color: '#c00',
    borderRadius: '6px',
  },

  pageTitle: {
    margin: 0,
    fontSize: '22px',
  },

  detail: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    borderRadius: '8px',
    maxWidth: '800px',
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    borderBottom: '1px solid #000000',
    textAlign: 'left'
  },

  label: {
    width: 'max-content',
    minWidth: '20%',
    padding: '3px',
    backgroundColor: '#eee',
    color: '#222',
    fontWeight: 'bold',
    borderRight: '1px solid #000000',
    flexShrink: 0,
  },

  value: {
    width: 'max-content',
    minWidth: '100%',
    flex: 1,
    padding: '5px',
    color: '#222',
    whiteSpace: 'pre-wrap' as const,
  },

  input: {
    width: '100%',
    minWidth: '130px',
    flex: 1,
    border: '1px solid #999',
    boxSizing: 'border-box' as const,
    padding: '10px',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#222',
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '10px',
    fontSize: '14px',
    resize: 'vertical' as const,
    flex: 1,
    border: '1px solid #333',
    color: '#222',
    backgroundColor: '#fff',
  },

  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },

  primaryButton: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },

  secondaryButton: {
    padding: '10px 18px',
    border: '1px solid #999',
    borderRadius: '6px',
    backgroundColor: '#fff',
    color: '#222',
    fontSize: '14px',
    cursor: 'pointer',
  },

  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },

  headerButtons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },

  success: {
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#e5f5e5',
      color: '#176b2c',
      borderRadius: '6px',
    },

  form: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '25px',
    maxWidth: '800px',
  },

  formRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '18px',
    textAlign: 'left' as const,
  },

  required: {
    color: '#c00',
    fontSize: '12px',
    marginLeft: '5px',
  },

  formButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '25px',
  },

  // wishList
  deleteButton: {
    padding: '6px 12px',
    border: '1px solid #c00',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#c00',
    cursor: 'pointer',
  },

  quantityInput: {
    width: '100%',
    padding: '3px',
    boxSizing: 'border-box',
  },
}