import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';

function MyCard({item}) {
    //Chuyển trang dung hook useNavigate
    const navigate = useNavigate()
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.class}
        </Card.Text>
        <Button onClick={() => navigate(`/students/${item.id}`)} variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;