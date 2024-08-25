import React from 'react';
import { useEffect, useState } from 'react';
import data from './db.json';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Drawer from './Drawer'
import { useWidgetContext } from './Context';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { selectedWidgets, removeWidget } = useWidgetContext();

  useEffect(() => {
    setCategories(data);
  }, []);

  const getSelectedWidgets = (category, categoryIndex) => {
    return category.widgets.filter((_, widgetIndex) => selectedWidgets[categoryIndex]?.[widgetIndex]);
  };

  const renderPieChart = (widgetData) => {
    const chartData = {
      labels: Object.keys(widgetData),
      datasets: [
        {
          data: Object.values(widgetData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
        },
      ],
    };

    return <Pie data={chartData} />;
  };

  const renderLineChart = (widgetData) => {
    if (!widgetData || Object.keys(widgetData).length === 0) {
      const defaultData = {
        labels: ['No Data'],
        datasets: [
          {
            label: 'No Data Available',
            data: [0],
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }
        ]
      };
      return <Line data={defaultData} options={{ responsive: true }} />;
    }

    const chartData = {
      labels: Object.keys(widgetData),
      datasets: [
        {
          label: 'Data',
          data: Object.values(widgetData),
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }
      ]
    };

    return <Line data={chartData} options={{ responsive: true }} />;
  };

  const renderStackedBarChart = (widgetData) => {
    if (!widgetData || Object.keys(widgetData).length === 0) {
      const defaultData = {
        labels: ['No Data'],
        datasets: [
          {
            label: 'No Data Available',
            data: [0],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ]
      };
      return <Bar data={defaultData} options={{ responsive: true, scales: { x: { stacked: true }, y: { stacked: true } } }} />;
    }

    const chartData = {
      labels: Object.keys(widgetData),
      datasets: [
        {
          label: 'Dataset 1',
          data: Object.values(widgetData).map(value => value * 0.6),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
        {
          label: 'Dataset 2',
          data: Object.values(widgetData).map(value => value * 0.4),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }
      ]
    };

    return <Bar data={chartData} options={{ responsive: true, scales: { x: { stacked: true }, y: { stacked: true } } }} />;
  };

  return (
    <>
      <div className='head'>
        <div className='heading'>
          <b>CNAPP DASHBOARD</b>
        </div>
        <div>
          <Drawer data={categories}>
            <button className='custom-button'>
              Add Widget <i className="fa-solid fa-plus"></i>
            </button>
          </Drawer>
        </div>
        <div>
          <button className='custom-button-2'>
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
        <div>
          <button className='custom-button-3'>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
        <div>
          <button className='custom-button-1'>
            <i className="fa-solid fa-clock" style={{ color: 'rgb(20, 20, 155)' }}></i> Last 2 days <i className="fa-solid fa-angle-down" style={{ color: 'rgb(20, 20, 155)' }}></i>
          </button>
        </div>
      </div>
      {categories.map((category, index) => (
        <div key={index}>
          <div className='category-head'><b className='category-name'>{category.category}</b></div>
          <div className='category'>
            <div className='widget-container'>
              {getSelectedWidgets(category, index).map((widget, widgetIndex) => (
                <div key={widgetIndex} className='widget' style={{ position: 'relative' }}>
                  <button
                    onClick={() => removeWidget(index, widgetIndex)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 1
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <b>{widget.title}</b>
                  {index === 0 && widget.type === 'pie_chart' && renderPieChart(widget.data)}
                  {index === 1 && renderLineChart(widget.data)}
                  {index === 2 && renderStackedBarChart(widget.data)}
                </div>
              ))}
              <Drawer data={categories}>
                <div className='widget'>
                  <button className='category-btn'><i className="fa-solid fa-plus"></i> Add Widget</button>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Categories;
