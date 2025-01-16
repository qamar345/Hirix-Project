import React from 'react'

const EmpMessages = () => {
  return (
    <div className="dashboardWrapper">
  <div className="entry-title">
    <h4 className="heading">Messages</h4>
  </div>

  <div className="table-dashboard-wapper uxper-messages">
    <div className="bg-overlay" />
    <div className="mess-list">
      <a href="#" className="icon-nav-mess">
        <i className="far fa-comments" />
      </a>
      <div className="tab-mess">
        <div className="mess-tab-head">
          <ul className="tab-list-mess">
            <li className="tab-item tab-all active">
              <a href="#tab-all">All</a>
            </li>
            <li className="tab-item tab-unread">
              <a href="#tab-unread">
                Unread<span>(0)</span>
              </a>
            </li>
          </ul>
          <span className="mess-refresh">
            <i className="far fa-sync fa-spin" />
            <span>Refresh</span>
          </span>
        </div>
        <div className="tab-content custom-scrollbar">
          <div className="tab-info" id="tab-all" style={{}}>
            <ul>
              <li className="list-user active" data-mess-id={15377}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">24 hours ago</span>
                  </div>
                  <div className="desc">Denememeeee </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14141}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">3 days ago</span>
                  </div>
                  <div className="desc">Define more details in you cv </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15369}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/plugins/civi-framework/assets/images/default-user-image.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">reza123</span>
                    <span className="date">1 week ago</span>
                  </div>
                  <div className="desc">test message </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15343}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">
                    Konnichiwa, sumimasen, kore wa bustei no janai desu!{" "}
                  </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15345}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">
                    Konnichiwa, sumimasen, kore wa bustei no janai desu!{" "}
                  </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15338}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">Hey, I saw your profile. </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15336}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">
                    Hi candidate, You are selected for round 2 .{" "}
                  </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15327}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">saasd </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15321}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">Fhh to yo </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15323}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">Fhh to yo </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15175}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 weeks ago</span>
                  </div>
                  <div className="desc">Kya job krni hai ?? </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15248}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/selena-gomez-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Selena Gomez</span>
                    <span className="date">1 month ago</span>
                  </div>
                  <div className="desc">dd </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15222}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/david-lee-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">David Lee</span>
                    <span className="date">1 month ago</span>
                  </div>
                  <div className="desc">gg </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15193}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 months ago</span>
                  </div>
                  <div className="desc">Testt </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14918}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 months ago</span>
                  </div>
                  <div className="desc">asdas </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15014}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">2 months ago</span>
                  </div>
                  <div className="desc">jghfch </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={15128}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/peter-parker-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Peter Packer</span>
                    <span className="date">2 months ago</span>
                  </div>
                  <div className="desc">p </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14962}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/peter-parker-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Peter Packer</span>
                    <span className="date">2 months ago</span>
                  </div>
                  <div className="desc">Hey can i rent you? </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14964}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/david-lee-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">David Lee</span>
                    <span className="date">2 months ago</span>
                  </div>
                  <div className="desc">Im hiring people with your skills </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14944}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/Messi-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Messi</span>
                    <span className="date">2 months ago</span>
                  </div>
                  <div className="desc">test chat </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14938}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">3 months ago</span>
                  </div>
                  <div className="desc">Job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14895}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">3 months ago</span>
                  </div>
                  <div className="desc">twetwet </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14822}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/plugins/civi-framework/assets/images/default-user-image.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Akeyla1</span>
                    <span className="date">4 months ago</span>
                  </div>
                  <div className="desc">Test </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14801}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">4 months ago</span>
                  </div>
                  <div className="desc">Hi </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14738}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">4 months ago</span>
                  </div>
                  <div className="desc">want it </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14701}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">4 months ago</span>
                  </div>
                  <div className="desc">how </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14667}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">5 months ago</span>
                  </div>
                  <div className="desc">Depuis profil </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14669}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">5 months ago</span>
                  </div>
                  <div className="desc">Content 2 </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14663}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/Messi-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Messi</span>
                    <span className="date">5 months ago</span>
                  </div>
                  <div className="desc">hello </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14653}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/kiana-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Kianna Ble</span>
                    <span className="date">5 months ago</span>
                  </div>
                  <div className="desc">GGG </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14619}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/denis-do-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Denis Do</span>
                    <span className="date">5 months ago</span>
                  </div>
                  <div className="desc">fdfgfdgf </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14597}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">5 months ago</span>
                  </div>
                  <div className="desc">This is a test message </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14568}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">5 months ago</span>
                  </div>
                  <div className="desc">erer </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14397}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">6 months ago</span>
                  </div>
                  <div className="desc">I write to apply for this job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14300}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">6 months ago</span>
                  </div>
                  <div className="desc">hello </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14234}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/david-lee-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">David Lee</span>
                    <span className="date">6 months ago</span>
                  </div>
                  <div className="desc">sqsqsq </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14206}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">6 months ago</span>
                  </div>
                  <div className="desc">ZOZOZOZOZO </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14089}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">7 months ago</span>
                  </div>
                  <div className="desc">fdfd </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14032}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">7 months ago</span>
                  </div>
                  <div className="desc">Hhhj </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={14021}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">7 months ago</span>
                  </div>
                  <div className="desc">wdcwcwccv </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13945}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/peter-parker-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Peter Packer</span>
                    <span className="date">8 months ago</span>
                  </div>
                  <div className="desc">Hh </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13936}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/plugins/civi-framework/assets/images/default-user-image.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">azaer</span>
                    <span className="date">8 months ago</span>
                  </div>
                  <div className="desc">gchvjbk </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13918}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/plugins/civi-framework/assets/images/default-user-image.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">pooran</span>
                    <span className="date">8 months ago</span>
                  </div>
                  <div className="desc">test </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13865}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/david-lee-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">David Lee</span>
                    <span className="date">8 months ago</span>
                  </div>
                  <div className="desc">Invite to job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13825}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/peter-parker-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Peter Packer</span>
                    <span className="date">8 months ago</span>
                  </div>
                  <div className="desc">456 </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13798}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/peter-parker-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Peter Packer</span>
                    <span className="date">8 months ago</span>
                  </div>
                  <div className="desc">hu </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13740}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">8 months ago</span>
                  </div>
                  <div className="desc">prueba </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13667}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">test </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13578}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">Test 7 </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13556}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">Hi alles goed? </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13547}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/peter-parker-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Peter Packer</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">dfdfd </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13504}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">Jjd hhd. Hhxjsnma </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13495}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">for sales manager ajob </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13486}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">hola hola </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13443}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">9 months ago</span>
                  </div>
                  <div className="desc">Test </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13342}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">10 months ago</span>
                  </div>
                  <div className="desc">on peut dealer </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13311}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">10 months ago</span>
                  </div>
                  <div className="desc">yolo </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13305}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">10 months ago</span>
                  </div>
                  <div className="desc">Hello </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13213}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">10 months ago</span>
                  </div>
                  <div className="desc">Am candidate </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13181}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">10 months ago</span>
                  </div>
                  <div className="desc">hola </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13186}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/plugins/civi-framework/assets/images/default-user-image.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">ezhilcandidate</span>
                    <span className="date">10 months ago</span>
                  </div>
                  <div className="desc">test </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13130}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/Messi-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Messi</span>
                    <span className="date">11 months ago</span>
                  </div>
                  <div className="desc">Hello, Nice Job. </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13128}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/selena-gomez-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Selena Gomez</span>
                    <span className="date">11 months ago</span>
                  </div>
                  <div className="desc">Apply this job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13112}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">11 months ago</span>
                  </div>
                  <div className="desc">hgrehgre </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={13099}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">11 months ago</span>
                  </div>
                  <div className="desc">invite teste </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12716}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">12 months ago</span>
                  </div>
                  <div className="desc">
                    I am very much interested for this postiion{" "}
                  </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12644}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">test </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12548}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/selena-gomez-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Selena Gomez</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">hello </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12524}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/denis-do-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Denis Do</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">apply this job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12522}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/denis-do-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Denis Do</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">apply this job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12516}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/plugins/civi-framework/assets/images/default-user-image.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Employer</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">Send message </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12474}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">TEST </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12441}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">hi </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={12083}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">Helo </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11924}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">asdfg </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11920}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/peter-parker-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Peter Packer</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">Yooop </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11839}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">hi </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11830}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/marcus-rosser-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Marcus Rosser</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">hey </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11581}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">We are interested </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11495}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">hii </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11365}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/selena-gomez-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Selena Gomez</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">hi </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11242}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/jenny-kim-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Jenny Kim</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">Apply this job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11205}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/david-lee-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">David Lee</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">Apply this job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11184}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Candidate</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">Demo apply job </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11164}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/selena-gomez-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Selena Gomez</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">test </div>
                </div>
              </li>
              <li className="list-user " data-mess-id={11024}>
                <div className="thumb">
                  <img
                    decoding="async"
                    src="http://civi.uxper.co/wp-content/uploads/2022/10/marcus-rosser-1.webp"
                    alt=""
                  />
                </div>
                <div className="detail">
                  <div className="name">
                    <span className="uname">Marcus Rosser</span>
                    <span className="date">1 year ago</span>
                  </div>
                  <div className="desc">ppppp </div>
                </div>
              </li>
            </ul>{" "}
          </div>
          <div className="tab-info" id="tab-unread" style={{ display: "none" }}>
            <ul></ul>{" "}
          </div>
        </div>
      </div>{" "}
    </div>
    <div className="mess-content">
      <div className="mess-content__head">
        <div className="left">
          <div className="thumb">
            <img
              decoding="async"
              src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
              alt=""
            />
          </div>
          <div className="detail">
            <div className="name">
              <span className="uname">Candidate</span>
            </div>
            <div className="info">Deneme</div>
          </div>
        </div>
        <div className="right">
          <a
            href="tel:123456789"
            className="action phone tooltip"
            data-title="Phone"
          >
            <i className="fas fa-phone-alt" />
          </a>
          <div className="action action-setting">
            <a href="#" className="icon-setting">
              <i className="fal fa-ellipsis-v" />
            </a>
            <ul className="action-dropdown">
              <li>
                <a
                  className="btn-add-to-message"
                  data-text='This is a "Demo" account so you not cant delete it'
                  href="#"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mess-content__body custom-scrollbar">
        <div className="card-mess card-receive">
          <div className="thumb">
            <img
              decoding="async"
              src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
              alt=""
            />
          </div>
          <div className="detail">
            <div className="name">
              <span className="uname">Candidate</span>
              <span className="date">24 hours ago</span>
            </div>
            <div className="desc">Denememeeee </div>
          </div>
        </div>
        <div className="card-mess card-send">
          <div className="thumb">
            <div className="thumb">
              <img
                decoding="async"
                src="https://civi.uxper.co/wp-content/plugins/civi-framework/assets/images/default-user-image.png"
                alt=""
              />
            </div>
          </div>
          <div className="detail">
            <div className="name">
              <span className="uname">You</span>
              <span className="date">24 hours ago</span>
            </div>
            <div className="desc">dsfsd </div>
          </div>
        </div>
        <div className="card-mess card-receive">
          <div className="thumb">
            <div className="thumb">
              <img
                decoding="async"
                src="https://civi.uxper.co/wp-content/uploads/2022/12/633e0700e8fb630be246f1f9_Untitled-3-p-500.png"
                alt=""
              />
            </div>
          </div>
          <div className="detail">
            <div className="name">
              <span className="uname">Candidate</span>
              <span className="date">24 hours ago</span>
            </div>
            <div className="desc">sdfdsfdsf </div>
          </div>
        </div>
      </div>
      <div className="mess-content__action">
        <textarea
          placeholder="Write your message"
          name="uxper_send_mess"
          defaultValue={""}
        />
        <button id="btn-write-message">
          Send{" "}
          <span className="btn-loading">
            <i className="fal fa-spinner fa-spin large" />
          </span>
        </button>
      </div>
    </div>
    <div className="civi-loading-effect">
      <span className="civi-dual-ring" />
    </div>
  </div>
  
</div>

  )
}

export default EmpMessages