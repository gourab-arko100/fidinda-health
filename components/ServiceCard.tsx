import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { SERVICE_PHOTO_FOCUS, type Service } from "@/lib/content";

// Card used on the home page grid. Photo: public/services/s{index}.jpg
export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link className="scard" href={`/services#s${index}`}>
      <div className="scard-media">
        <Image src={`/services/s${index}.jpg`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: SERVICE_PHOTO_FOCUS[index] ?? "50% 50%" }} />
        <span className="scard-chip">{String(index).padStart(2, "0")}</span>
        <span className="ic ic-float"><Icon name={service.icon} size={24} /></span>
      </div>
      <div className="scard-body">
        <h3>{service.title}</h3>
        <p>{service.short}</p>
        <ul className="scard-pts">
          {service.points.slice(0, 3).map((p) => (
            <li key={p}><Icon name="check" size={14} />{p}</li>
          ))}
        </ul>
        <span className="scard-go">Learn more <Icon name="arrow" size={16} /></span>
      </div>
    </Link>
  );
}
