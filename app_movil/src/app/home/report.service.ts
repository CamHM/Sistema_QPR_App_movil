import { Injectable } from '@angular/core';
import {Person} from '../entity/person';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../entity/post';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private users: Person[] = [
    {
      code_person: 201612173,
      first_name: 'María',
      last_name: 'Mendez',
      path_photo: 'https://www.arminreinhardt.com/wp-content/uploads/2017/04/gleicia.jpg',
      type_person: 'E',
      email: 'maria.mendez@uptc.edu.co',
      password: 'mame123'
    }
  ];

  private myPosts: Post[] = [
    {
      id_post: 1,
      code_person: 201612173,
      title: 'Fallo eléctrivo edificio Central',
      content: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      date: '01/02/2019 - 10:02:12',
      latitude: 5.4569,
      longitude: -71.2658,
      photos: [
        {
          img: 'https://cdn.pixabay.com/photo/2019/05/20/22/41/apple-4217863_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2017/09/21/18/55/hildesheim-2772941_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2018/04/23/15/04/salt-3344508_960_720.jpg'
        }
      ]
    },
    {
      id_post: 1,
      code_person: 201612173,
      title: 'Se jue la luz',
      content: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      date: '01/02/2019 - 10:02:12',
      latitude: 5.4569,
      longitude: -71.2658,
      photos: [
        {
          img: 'https://cdn.pixabay.com/photo/2017/08/01/12/14/wall-2564902_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2019/06/05/14/27/forest-4253766_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2019/06/04/16/31/canyon-4251799_960_720.jpg'
        }
      ]
    }
  ];

  private posts: Post[] = [
    {
      id_post: 1,
      code_person: 201612173,
      title: 'Nos destruiran a todos!',
      content: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      date: '01/02/2019 - 10:02:12',
      latitude: 5.4569,
      longitude: -71.2658,
      photos: [
        {
          img: 'https://i.ytimg.com/vi/ItL-kbj5_9U/maxresdefault.jpg'
        },
        {
          img: 'https://i.ytimg.com/vi/lwnctG_dKUM/maxresdefault.jpg'
        },
        {
          img: 'https://i.ytimg.com/vi/jAOchLs87go/maxresdefault.jpg'
        }
      ]
    },
    {
      id_post: 1,
      code_person: 201612173,
      title: 'Se nos vino el techo',
      content: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      date: '01/02/2019 - 10:02:12',
      latitude: 5.4569,
      longitude: -71.2658,
      photos: [
        {
          img: 'https://cdn.pixabay.com/photo/2015/11/27/20/28/florence-1066314_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2013/07/23/23/18/honey-166400_960_720.jpg'
        }
      ]
    },
    {
      id_post: 1,
      code_person: 201612173,
      title: 'Otro problema',
      content: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      date: '01/02/2019 - 10:02:12',
      latitude: 5.4569,
      longitude: -71.2658,
      photos: [
        {
          img: 'https://cdn.pixabay.com/photo/2016/05/31/11/22/three-1426639_960_720.png'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2016/05/31/11/28/eight-1426653_960_720.png'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2016/05/31/11/22/six-1426638_960_720.png'
        }
      ]
    },
    {
      id_post: 1,
      code_person: 201612173,
      title: 'Red caida',
      content: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      date: '01/02/2019 - 10:02:12',
      latitude: 5.4569,
      longitude: -71.2658,
      photos: [
        {
          img: 'https://cdn.pixabay.com/photo/2018/05/14/16/54/cyber-3400789_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2016/03/17/23/00/world-1264062_960_720.jpg'
        },
        {
          img: 'https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_960_720.jpg'
        }
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  getUser() {
    return this.users[0];
  }

  public sendPost(post): Observable<Post> {
    return this.http.post<Post>('http://192.168.137.95:3000/post/add', post);
  }

  getMyPost() {
    return this.myPosts;
  }

  getPosts() {
    return this.posts;
  }
}
