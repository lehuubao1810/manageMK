import { useState, useEffect, useRef, useContext } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { add, format, set } from 'date-fns';

import Header from '../components/Header';
import ImgInfo from '../components/ImgInfo';
// import ListImg from '../layout/ListImg';

function Home() {

  // get data from firebase
  const [imgWed, setImgWed] = useState([]);
  const [imgYb, setImgYb] = useState([]);
  const [imgAnni, setImgAnni] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        getData('wedding', setImgWed);
        getData('yearbook', setImgYb);
        getData('anniversary', setImgAnni);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);
  async function getData(category, setCategory) {
    const docRef = doc(db, "images", category);
    const querySnapshot = await getDoc(docRef);
    // Trích xuất dữ liệu từ Firestore và cập nhật state
    if (querySnapshot.exists()) {
      const data = querySnapshot.data().img;
      if (data) {
        setCategory(data);
      } else {
        setCategory([]);
      }

    } else {
      console.log("No such document!");
    }

  }

  // const { logout, setCurrentUser, currentUser, loading } = useAuth();

  const [category, setCategory] = useState('All');

  const [statusSortBox, setStatusSortBox] = useState(false);
  const [currentSort, setCurrentSort] = useState('Newest');

  const imgAllRef = useRef([]);
  const [listImg, setListImg] = useState([]);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  function handleChange(e, setState) {
    setState(e.target.textContent);
    // add class active
    e.target.parentElement.querySelectorAll('.active').forEach((el) => {
      el.classList.remove('active');
    }
    );
    e.target.classList.add('active');
  }

  useEffect(() => {
    const newImgAll = [...imgWed, ...imgYb, ...imgAnni];
    // sort by date
    newImgAll.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    if (JSON.stringify(newImgAll) === JSON.stringify(imgAllRef.current)) {
      return; // thoát sớm nếu không có sự thay đổi
    }
    imgAllRef.current = newImgAll;
    setListImg(newImgAll);
  }, [imgWed, imgYb, imgAnni]);

  useEffect(() => {
    let filteredArr = [];
    switch (category) {
      case 'All':
        filteredArr = imgAllRef.current;
        break;
      case 'Weddings':
        filteredArr = imgWed;
        break;
      case 'Yearbooks':
        filteredArr = imgYb;
        break;
      case 'Anniversary':
        filteredArr = imgAnni;
        break;
      default:
        break;
    }
    if (currentSort === 'Oldest') {
      filteredArr.sort((a, b) => new Date(a.time) - new Date(b.time));
    } else {
      filteredArr.sort((a, b) => new Date(b.time) - new Date(a.time));
    }
    setListImg(filteredArr);
    if (statusSortBox) {
      setStatusSortBox(false);
    }
  }, [category, currentSort]);

  async function updateFirestore(category, arrImg) {
    setLoadingUpdate(true);
    const docRef = doc(db, "images", category);
    await updateDoc(docRef, {
      img: [...arrImg]
    });
    setLoadingUpdate(false);
  }

  function handleDelete(index, img) {
    let newArr = [...listImg];
    newArr.splice(index, 1);
    setListImg(newArr);
    switch (img.category) {
      case 'wedding':
        setImgWed(prevImgWed => {
          const updatedImgWed = deleteImg(img, prevImgWed);
          updateFirestore(img.category, updatedImgWed);
          console.log('đã xóa Wd');
          return updatedImgWed;
        });
        break;
      case 'yearbook':
        setImgYb(prevImgYb => {
          const updatedImgYb = deleteImg(img, prevImgYb);
          updateFirestore(img.category, updatedImgYb);
          console.log('đã xóa Yb');
          return updatedImgYb;
        });
        break;
      case 'anniversary':
        setImgAnni(prevImgAnni => {
          const updatedImgAnni = deleteImg(img, prevImgAnni);
          updateFirestore(img.category, updatedImgAnni);
          console.log('đã xóa Anni');
          return updatedImgAnni;
        });
        break;
      default:
        break;
    }
  }

  function deleteImg(img, arrImg) {
    let newArr = [...arrImg];
    newArr = newArr.filter((imgEl) => imgEl !== img);
    return newArr;
  }

  function handleAdd(newImg) {
    let newArr = [...listImg];
    newArr.push(newImg);
    setListImg(newArr);
    switch (newImg.category) {
      case 'wedding':
        setImgWed([...imgWed, newImg]);
        break;
      case 'yearbook':
        setImgYb([...imgYb, newImg]);
        break;
      case 'anniversary':
        setImgAnni([...imgAnni, newImg]);
        break;
      default:
        break;
    }
  }

  function handleChangeCategory(index, img, category) {
    const imgSub = { ...img };
    handleDelete(index, img);
    switch (category) {
      case 'wedding':
        setImgWed(prevImgWed => addImgCategory(imgSub, category, prevImgWed));
        break;
      case 'yearbook':
        setImgYb(prevImgYb => addImgCategory(imgSub, category, prevImgYb));
        break;
      case 'anniversary':
        setImgAnni(prevImgAnni => addImgCategory(imgSub, category, prevImgAnni));
        break;
      default:
        break;
    }  
  }

  function addImgCategory(img, category, prevImg) {
    img.category = category;
    const updatedImg = [...prevImg, img];
    updateFirestore(category, updatedImg);
    return updatedImg;
  }


  return (
    <>
      <Header handleAdd={handleAdd} />
      <div className="tool">
        <div className="category">
          <div
            className="category__item active"
            onClick={(e) => handleChange(e, setCategory)}
          >
            All
          </div>
          <div
            className="category__item"
            onClick={(e) => handleChange(e, setCategory)}
          >
            Weddings
          </div>
          <div
            className="category__item"
            onClick={(e) => handleChange(e, setCategory)}
          >
            Yearbooks
          </div>
          <div
            className="category__item"
            onClick={(e) => handleChange(e, setCategory)}
          >
            Anniversary
          </div>
        </div>
      </div>

      <div className="container">
        <div className="sortfunc">
          <div className="sort-box">
            <div className="current-status-sort"
              onClick={() => setStatusSortBox(!statusSortBox)}
            >
              <span>{currentSort}</span>
              <i className='fas fa-chevron-down'></i>
            </div>

            {
              statusSortBox && (
                <div className="sort-box__options">
                  <div
                    className="sort-box__item"
                    onClick={(e) => handleChange(e, setCurrentSort)}
                  >
                    Newest
                  </div>
                  <div
                    className="sort-box__item"
                    onClick={(e) => handleChange(e, setCurrentSort)}
                  >
                    Oldest
                  </div>
                </div>
              )
            }

          </div>
        </div>
        {/* <ListImg listImg={listImg}/> */}
        <div className="listImg">
          {
            listImg.map((img, index) => (
              <ImgInfo
                key={index}
                img={img}
                index={index}
                handleDelete={handleDelete}
                handleChangeCategory={handleChangeCategory}
              />
            ))
          }
        </div>
        {
          loadingUpdate && (
            <div className="loadingUpdateBg">
              <div className="circle-loading"></div>
            </div>
          )
        }
      </div>
    </>

  )
}

export default Home