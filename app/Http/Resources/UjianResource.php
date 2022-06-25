<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UjianResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'matpel' => $this->matpel,
            'kelas' => $this->kelas,
            'durasi' => $this->durasi,
            'mulai_ujian' => $this->mulai_ujian,
            'selesai_ujian' => $this->selesai_ujian,
        ];
    }
}
